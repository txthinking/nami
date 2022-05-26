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
	"errors"
	"io"
	"io/ioutil"
	"net/http"
	"os"
	"path/filepath"
	"runtime"
	"strings"
)

func (nm *Nami) Parse(input string) (string, string, string, error) {
	n := input[strings.LastIndex(input, "/")+1:]
	n = strings.TrimSuffix(n, ".tengo")
	n = strings.TrimSuffix(n, ".js")
	n = strings.TrimSuffix(n, ".ts")
	k := "tengo"
	if strings.HasSuffix(input, ".js") || strings.HasSuffix(input, ".ts") {
		k = "deno"
		deno := "deno"
		if runtime.GOOS == "windows" {
			deno = "deno.exe"
		}
		_, err := os.Stat(filepath.Join(nm.BinDir, deno))
		if err != nil {
			if !os.IsNotExist(err) {
				return "", "", "", err
			}
			return "", "", "", errors.New("Install deno first $ nami install deno")
		}
	}
	s := input
	if k == "tengo" && (strings.HasPrefix(input, "http://") || strings.HasPrefix(input, "https://")) {
		res, err := http.Get(input)
		if err != nil {
			return "", "", "", err
		}
		defer res.Body.Close()
		b, err := io.ReadAll(res.Body)
		if err != nil {
			return "", "", "", err
		}
		s = string(b)
		if res.StatusCode != 200 {
			return "", "", "", errors.New("Package not found")
		}
	}
	if k == "tengo" && !(strings.HasPrefix(input, "http://") || strings.HasPrefix(input, "https://")) {
		st, err0 := os.Stat(input)
		if err0 != nil && !os.IsNotExist(err0) {
			return "", "", "", err0
		}
		if err0 != nil || st.IsDir() {
			res, err := http.Get("https://raw.githubusercontent.com/txthinking/nami/master/package/" + n + ".tengo")
			if err != nil {
				return "", "", "", err
			}
			defer res.Body.Close()
			b, err := io.ReadAll(res.Body)
			if err != nil {
				return "", "", "", err
			}
			s = string(b)
			if res.StatusCode != 200 {
				return "", "", "", errors.New("Package not found")
			}
		}
		if err0 == nil && !st.IsDir() {
			b, err := ioutil.ReadFile(input)
			if err != nil {
				return "", "", "", err
			}
			s = string(b)
		}
	}
	return n, k, s, nil
}
