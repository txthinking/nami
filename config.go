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
	"log"
	"os"

	"github.com/olekukonko/tablewriter"
	"go.etcd.io/bbolt"
)

func (n *Nami) SetConfig(k, v string) error {
	err := n.DB.Update(func(tx *bbolt.Tx) error {
		t, err := tx.CreateBucketIfNotExists([]byte("config"))
		if err != nil {
			return err
		}
		if err := t.Put([]byte(k), []byte(v)); err != nil {
			return err
		}
		return nil
	})
	return err
}

func (n *Nami) GetConfig(k string) (string, error) {
	s := ""
	err := n.DB.Update(func(tx *bbolt.Tx) error {
		t, err := tx.CreateBucketIfNotExists([]byte("config"))
		if err != nil {
			return err
		}
		b := t.Get([]byte(k))
		if b == nil {
			return nil
		}
		s = string(b)
		return nil
	})
	return s, err
}

func (n *Nami) PrintConfigs() {
	table := tablewriter.NewWriter(os.Stdout)
	table.SetAutoWrapText(false)
	table.SetHeader([]string{"Key", "Value", "Description"})
	table.Append([]string{"nami.root", "~/.nami", "Nami root dir, can't be modified"})
	table.Append([]string{"nami.db", "~/.nami/db", "Nami db file, can't be modified"})
	table.Append([]string{"nami.bin", "~/.nami/bin", "Nami bin dir, can't be modified"})
	s, err := n.GetConfig("github.token")
	if err != nil {
		log.Println(err)
		return
	}
	table.Append([]string{"github.token", s, "Github token for publishing packages"})
	table.Render()
}
