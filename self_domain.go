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
	"fmt"
	"net/http"

	"github.com/bitly/go-simplejson"
)

type SelfDomain struct {
}

func (d *SelfDomain) Version(name string) (string, error) {
	s := fmt.Sprintf("https://%s/nami.json", name)
	r, err := http.Get(s)
	if err != nil {
		return "", err
	}
	defer r.Body.Close()
	if r.StatusCode == 404 {
		return "", errors.New("This package doesn't support nami")
	}
	j, err := simplejson.NewFromReader(r.Body)
	if err != nil {
		return "", err
	}
	s, err = j.Get("version").String()
	if err != nil {
		return "", err
	}
	return s, nil
}

func (d *SelfDomain) Files(name string) ([]string, error) {
	s := fmt.Sprintf("https://%s/nami.json", name)
	r, err := http.Get(s)
	if err != nil {
		return nil, err
	}
	defer r.Body.Close()
	if r.StatusCode == 404 {
		return nil, errors.New("This package doesn't support nami")
	}
	j, err := simplejson.NewFromReader(r.Body)
	if err != nil {
		return nil, err
	}
	l, err := j.Get("files").Array()
	if err != nil {
		return nil, err
	}
	l1 := make([]string, 0)
	for i := 0; i < len(l); i++ {
		s, err := j.Get("files").GetIndex(i).String()
		if err != nil {
			return nil, err
		}
		l1 = append(l1, s)
	}
	return l1, nil
}
