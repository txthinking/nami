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
	"strings"

	"github.com/urfave/cli/v2"
)

func main() {
	app := cli.NewApp()
	app.Name = "nami"
	app.Version = "20211227"
	app.Usage = "A decentralized binary package manager"
	app.Authors = []*cli.Author{
		{
			Name:  "Cloud",
			Email: "cloud@txthinking.com",
		},
	}
	app.Copyright = "https://github.com/txthinking/nami"
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
					f, err := n.Install(v[strings.LastIndex(v, "/")+1:])
					if err != nil {
						return err
					}
					n.Print(v[strings.LastIndex(v, "/")+1:], false)
					if f != nil {
						defer f()
					}
				}
				return nil
			},
		},
		&cli.Command{
			Name:  "upgrade",
			Usage: "Upgrade package. $ nami upgrade nami. Or upgrade all installed packages $ nami upgrade",
			Action: func(c *cli.Context) error {
				n, err := NewNami()
				if err != nil {
					return err
				}
				defer n.Close()
				if c.Args().Len() == 0 {
					l, err := n.GetInstalledPackageList()
					if err != nil {
						return err
					}
					for _, v := range l {
						f, err := n.Install(v.Name[strings.LastIndex(v.Name, "/")+1:])
						if err != nil {
							return err
						}
						n.Print(v.Name[strings.LastIndex(v.Name, "/")+1:], false)
						if f != nil {
							defer f()
						}
					}
					return nil
				}
				for _, v := range c.Args().Slice() {
					f, err := n.Install(v[strings.LastIndex(v, "/")+1:])
					if err != nil {
						return err
					}
					n.Print(v[strings.LastIndex(v, "/")+1:], false)
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
