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
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"path/filepath"
	"runtime"
	"strings"

	"github.com/olekukonko/tablewriter"
	"go.etcd.io/bbolt"
)

type Nami struct {
	BinDir string
	DB     *bbolt.DB
}

func NewNami() (*Nami, error) {
	s, err := os.UserHomeDir()
	if err != nil {
		return nil, err
	}
	s1 := filepath.Join(s, ".nami", "bin")
	if err := os.MkdirAll(s1, 0777); err != nil {
		return nil, err
	}
	db, err := bbolt.Open(filepath.Join(s, ".nami", "db"), 0644, nil)
	if err != nil {
		return nil, err
	}
	return &Nami{
		BinDir: s1,
		DB:     db,
	}, nil
}

func (n *Nami) MakeFiles(urls []string) map[string]string {
	m := make(map[string]string, 0)
	for _, v := range urls {
		if runtime.GOOS != "windows" {
			sfx := "_" + runtime.GOOS + "_" + runtime.GOARCH
			if !strings.HasSuffix(v, sfx) {
				continue
			}
			m[v[strings.LastIndex(v, "/")+1:len(v)-len(sfx)]] = v
		}
		if runtime.GOOS == "windows" {
			sfx := "_" + runtime.GOOS + "_" + runtime.GOARCH + ".exe"
			if !strings.HasSuffix(v, sfx) {
				continue
			}
			m[v[strings.LastIndex(v, "/")+1:len(v)-len(sfx)]+".exe"] = v
		}
	}
	return m
}

func (n *Nami) Install(name string) error {
	d := GetDomain(name)
	p, err := n.GetInstalled(name)
	if err != nil {
		return err
	}
	s, err := d.Version(name)
	if err != nil {
		return err
	}
	if p != nil && s == p.Version {
		return nil
	}

	l, err := d.Files(name)
	if err != nil {
		return err
	}
	m := n.MakeFiles(l)
	if len(m) == 0 {
		return errors.New(fmt.Sprintf("No files for %s %s", runtime.GOOS, runtime.GOARCH))
	}
	for k, v := range m {
		r, err := http.Get(v)
		if err != nil {
			return err
		}
		b, err := ioutil.ReadAll(r.Body)
		if err != nil {
			return err
		}
		r.Body.Close()
		if err := ioutil.WriteFile(filepath.Join(n.BinDir, k), b, 0755); err != nil {
			return err
		}
	}

	p = &Package{
		Name:    name,
		Version: s,
		Files:   m,
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
	return err
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
	if p.Name == "" {
		return nil, nil
	}
	return p, err
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
	if remote {
		table.Append([]string{"", ""})
		d := GetDomain(name)
		s, err := d.Version(name)
		if err != nil {
			fmt.Println(err)
			return
		}
		table.Append([]string{"Latest Version", s})
		l, err := d.Files(name)
		if err != nil {
			fmt.Println(err)
			return
		}
		m := n.MakeFiles(l)
		l = make([]string, 0)
		for k, _ := range m {
			l = append(l, k)
		}
		table.Append([]string{"Latest Files", strings.Join(l, ", ")})
	}
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
