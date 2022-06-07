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
	"strings"
)

func (nm *Nami) Parse(input string) (string, string, error) {
	if strings.HasSuffix(input, ".tengo") && (strings.HasPrefix(input, "http://") || strings.HasPrefix(input, "https://")) {
		n := input[strings.LastIndex(input, "/")+1:]
		n = strings.TrimSuffix(n, ".tengo")
		res, err := http.Get(input)
		if err != nil {
			return "", "", err
		}
		defer res.Body.Close()
		b, err := io.ReadAll(res.Body)
		if err != nil {
			return "", "", err
		}
		if res.StatusCode != 200 {
			return "", "", errors.New("Package not found")
		}
		return n, string(b), nil
	}
	if strings.HasSuffix(input, ".tengo") && !(strings.HasPrefix(input, "http://") || strings.HasPrefix(input, "https://")) {
		n := input[strings.LastIndex(input, "/")+1:]
		n = strings.TrimSuffix(n, ".tengo")
		b, err := ioutil.ReadFile(input)
		if err != nil {
			return "", "", err
		}
		return n, string(b), nil
	}
	res, err := http.Get("https://raw.githubusercontent.com/txthinking/nami/master/package/" + input + ".tengo")
	if err != nil {
		return "", "", err
	}
	defer res.Body.Close()
	b, err := io.ReadAll(res.Body)
	if err != nil {
		return "", "", err
	}
	if res.StatusCode != 200 {
		return "", "", errors.New(res.Status + " " + string(b))
	}
	return input, string(b), nil
}
