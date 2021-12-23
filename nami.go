// Copyright (c) 2020-present Cloud <cloud@txthinking.com>
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of version 3 of the GNU General Public
// License as published by the Free Software Foundation.
//
// This program is distributed in the hope that it will be useful, but
// WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
// General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <https://www.gnu.org/licenses/>.

package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"strings"

	"github.com/olekukonko/tablewriter"
	"go.etcd.io/bbolt"
)

type Nami struct {
	CacheDir string
	BinDir   string
	DB       *bbolt.DB
}

type Package struct {
	Name    string
	Version string
	Files   map[string]string
}

func NewNami() (*Nami, error) {
	s, err := os.UserHomeDir()
	if err != nil {
		return nil, err
	}
	bin := filepath.Join(s, ".nami", "bin")
	if err := os.MkdirAll(bin, 0777); err != nil {
		return nil, err
	}
	db, err := bbolt.Open(filepath.Join(s, ".nami", "db"), 0644, nil)
	if err != nil {
		return nil, err
	}
	deno := "deno"
	if runtime.GOOS == "windows" {
		deno = "deno.exe"
	}
	_, err = os.Stat(filepath.Join(bin, deno))
	if err != nil {
		if !os.IsNotExist(err) {
			return nil, err
		}
		r, err := static.Open("static/" + deno)
		if err != nil {
			return nil, err
		}
		defer r.Close()
		w, err := os.OpenFile(filepath.Join(bin, deno), os.O_WRONLY|os.O_CREATE, 0755)
		if err != nil {
			return nil, err
		}
		defer w.Close()
		if _, err := io.Copy(w, r); err != nil {
			return nil, err
		}
	}
	return &Nami{
		CacheDir: filepath.Join(s, ".nami", "cache"),
		BinDir:   bin,
		DB:       db,
	}, nil
}

func (n *Nami) CleanCache() error {
	if err := os.RemoveAll(n.CacheDir); err != nil {
		return err
	}
	if err := os.MkdirAll(n.CacheDir, 0777); err != nil {
		return err
	}
	return nil
}

func (n *Nami) Install(name string) (func(), error) {
	// compatible
	if strings.Contains(name, "/") {
		name = name[strings.LastIndex(name, "/")+1:]
	}

	if err := n.CleanCache(); err != nil {
		return nil, err
	}

	s, err := n.GetConfig("nami.deno.base")
	if err != nil {
		return nil, err
	}
	if s == "" {
		s = "https://raw.githubusercontent.com/txthinking/nami/master/package/"
	}
	fmt.Println("Run", s+name+".js")
	deno := filepath.Join(n.BinDir, "deno")
	if runtime.GOOS == "windows" {
		deno = filepath.Join(n.BinDir, "deno.exe")
	}
	cmd := exec.Command(deno, "run", "-r", "-A", s+name+".js")
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	if err := cmd.Run(); err != nil {
		return nil, err
	}

	p := &Package{
		Name:  name,
		Files: make(map[string]string),
	}
	files, err := os.ReadDir(n.CacheDir)
	if err != nil {
		return nil, err
	}
	for _, file := range files {
		if file.Name() == "version" {
			b, err := os.ReadFile(filepath.Join(n.CacheDir, file.Name()))
			if err != nil {
				return nil, err
			}
			p.Version = string(b)
			continue
		}
		p.Files[file.Name()] = ""
		if file.Name() == "nami" || file.Name() == "nami.exe" || file.Name() == "deno" || file.Name() == "deno.exe" {
			if err := os.Chmod(filepath.Join(n.CacheDir, file.Name()), 0755); err != nil {
				return nil, err
			}
			continue
		}
		r, err := os.Open(filepath.Join(n.CacheDir, file.Name()))
		if err != nil {
			return nil, err
		}
		defer r.Close()
		w, err := os.OpenFile(filepath.Join(n.BinDir, file.Name()), os.O_TRUNC|os.O_WRONLY|os.O_CREATE, 0755)
		if err != nil {
			return nil, err
		}
		defer w.Close()
		if _, err := io.Copy(w, r); err != nil {
			return nil, err
		}
	}
	err = n.DB.Update(func(tx *bbolt.Tx) error {
		b, err := json.Marshal(p)
		if err != nil {
			return err
		}
		t, err := tx.CreateBucketIfNotExists([]byte("package"))
		if err != nil {
			return err
		}
		if err := t.Put([]byte(p.Name), b); err != nil {
			return err
		}
		return nil
	})
	if err != nil {
		return nil, err
	}
	if name != "nami" && name != "deno" {
		return nil, nil
	}
	return func() {
		cmd := exec.Command("sh", "-c", fmt.Sprintf("sleep 3 && cp %s %s", filepath.Join(n.CacheDir, name), filepath.Join(n.BinDir, name)))
		if runtime.GOOS == "windows" {
			cmd = exec.Command("cmd", "/C", fmt.Sprintf("ping localhost -n 3 -w 1000 > NUL && copy /y %s.exe %s.exe", filepath.Join(n.CacheDir, name), filepath.Join(n.BinDir, name)))
		}
		if err := cmd.Start(); err != nil {
			log.Println(err)
		}
	}, nil
}

func (n *Nami) GetInstalledPackageList() ([]*Package, error) {
	l := make([]*Package, 0)
	err := n.DB.Update(func(tx *bbolt.Tx) error {
		t, err := tx.CreateBucketIfNotExists([]byte("package"))
		if err != nil {
			return err
		}
		err = t.ForEach(func(_, v []byte) error {
			p := &Package{}
			if err := json.Unmarshal(v, p); err != nil {
				return err
			}
			l = append(l, p)
			return nil
		})
		return nil
	})
	if err != nil {
		return nil, err
	}
	return l, nil
}

func (n *Nami) Remove(name string) error {
	if name == "nami" {
		log.Println("If you really want to remove nami and all packages, just $ rm -rf ~/.nami")
		return nil
	}
	p, err := n.GetInstalled(name)
	if err != nil {
		return err
	}
	if p == nil {
		return nil
	}
	for k, _ := range p.Files {
		if err := os.Remove(filepath.Join(n.BinDir, k)); err != nil {
			return err
		}
	}
	err = n.DB.Update(func(tx *bbolt.Tx) error {
		t, err := tx.CreateBucketIfNotExists([]byte("package"))
		if err != nil {
			return err
		}
		if err := t.Delete([]byte(name)); err != nil {
			return err
		}
		return nil
	})
	return err
}

func (n *Nami) GetInstalled(name string) (*Package, error) {
	p := &Package{}
	err := n.DB.Update(func(tx *bbolt.Tx) error {
		t, err := tx.CreateBucketIfNotExists([]byte("package"))
		if err != nil {
			return err
		}
		b := t.Get([]byte(name))
		if b == nil {
			return nil
		}
		if err := json.Unmarshal(b, p); err != nil {
			return err
		}
		return nil
	})
	if err != nil {
		return nil, err
	}
	if p.Name == "" {
		return nil, nil
	}
	return p, nil
}

func (n *Nami) Print(name string, remote bool) {
	p, err := n.GetInstalled(name)
	if err != nil {
		fmt.Println(err)
		return
	}
	if p == nil {
		p = &Package{
			Files: make(map[string]string),
		}
	}
	table := tablewriter.NewWriter(os.Stdout)
	table.Append([]string{"Package", name})
	table.Append([]string{"", ""})
	table.Append([]string{"Installed Version", p.Version})
	l := make([]string, 0)
	for k, _ := range p.Files {
		l = append(l, k)
	}
	table.Append([]string{"Installed Files", strings.Join(l, ", ")})
	table.Render()
}

func (n *Nami) PrintAll() {
	table := tablewriter.NewWriter(os.Stdout)
	table.SetHeader([]string{"Package", "Installed Version", "Installed Files"})
	err := n.DB.Update(func(tx *bbolt.Tx) error {
		t, err := tx.CreateBucketIfNotExists([]byte("package"))
		if err != nil {
			return err
		}
		err = t.ForEach(func(k, v []byte) error {
			p := &Package{}
			if err := json.Unmarshal(v, p); err != nil {
				return err
			}
			l := make([]string, 0)
			for k, _ := range p.Files {
				l = append(l, k)
			}
			table.Append([]string{string(k), p.Version, strings.Join(l, ", ")})
			return nil
		})
		return nil
	})
	if err != nil {
		fmt.Println(err)
		return
	}
	table.Render()
}

func (n *Nami) Close() error {
	return n.DB.Close()
}
