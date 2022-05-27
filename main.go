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
	"log"
	"net/http"
	"os"

	"github.com/bitly/go-simplejson"
	"github.com/urfave/cli/v2"
)

func main() {
	app := cli.NewApp()
	app.Name = "nami"
	app.Version = "20220601"
	app.Usage = "The easy way to download anything from anywhere"
	app.Authors = []*cli.Author{
		{
			Name:  "Cloud",
			Email: "cloud@txthinking.com",
		},
	}
	app.Copyright = "https://github.com/txthinking/nami"
	app.Before = func(*cli.Context) error {
		res, err := http.Get("https://api.github.com/repos/txthinking/nami/releases/latest")
		if err != nil {
			return err
		}
		defer res.Body.Close()
		j, err := simplejson.NewFromReader(res.Body)
		if err != nil {
			return err
		}
		s, err := j.Get("tag_name").String()
		if err != nil {
			return err
		}
		if s > "v20220601" {
			return errors.New("New version: " + s + ", please upgrade nami first: $ nami install nami")
		}
		return nil
	}
	app.Commands = []*cli.Command{
		&cli.Command{
			Name:  "install",
			Usage: "Install package. $ nami install nami",
			Action: func(c *cli.Context) error {
				n, err := NewNami()
				if err != nil {
					return err
				}
				defer n.Close()
				if c.Args().Len() == 0 {
					cli.ShowCommandHelp(c, "install")
					return nil
				}
				for _, v := range c.Args().Slice() {
					name, kind, script, err := n.Parse(v)
					if err != nil {
						return err
					}
					f, err := n.Install(name, kind, script)
					if err != nil {
						return err
					}
					n.Print(name, false)
					if f != nil {
						defer f()
					}
				}
				return nil
			},
		},
		&cli.Command{
			Name:  "remove",
			Usage: "Remove package. $ nami remove brook",
			Action: func(c *cli.Context) error {
				n, err := NewNami()
				if err != nil {
					return err
				}
				defer n.Close()
				if c.Args().Len() == 0 {
					cli.ShowCommandHelp(c, "remove")
					return nil
				}
				for _, v := range c.Args().Slice() {
					if err := n.Remove(v); err != nil {
						return err
					}
				}
				return nil
			},
		},
		&cli.Command{
			Name:  "list",
			Usage: "Print installed packages. $ nami list",
			Action: func(c *cli.Context) error {
				n, err := NewNami()
				if err != nil {
					return err
				}
				defer n.Close()
				n.PrintAll()
				return nil
			},
		},
		&cli.Command{
			Name:  "config",
			Usage: "Configure key and value. $ nami config <key> <value>. See all keys, $ nami config",
			Action: func(c *cli.Context) error {
				n, err := NewNami()
				if err != nil {
					return err
				}
				defer n.Close()
				if c.Args().Len() == 0 {
					n.PrintConfigs()
					return nil
				}
				if c.Args().Len() != 2 {
					cli.ShowCommandHelp(c, "config")
					return nil
				}
				return n.SetConfig(c.Args().Slice()[0], c.Args().Slice()[1])
			},
		},
		&cli.Command{
			Name:  "release",
			Usage: "Create or update a version with binaries directory on your github project, such as $ nami release github.com/txthinking/nami v1.1.1 ./binaries/",
			Action: func(c *cli.Context) error {
				n, err := NewNami()
				if err != nil {
					return err
				}
				defer n.Close()
				if c.Args().Len() != 3 {
					cli.ShowCommandHelp(c, "release")
					return nil
				}
				p := &Github{}
				err = p.Init(n)
				if err != nil {
					return err
				}
				return p.Release(c.Args().Slice()[0], c.Args().Slice()[1], c.Args().Slice()[2])
			},
		},
	}
	if err := app.Run(os.Args); err != nil {
		log.Fatal(err)
	}
}
