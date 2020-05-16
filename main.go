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
	"fmt"
	"log"
	"os"

	"github.com/urfave/cli"
)

func main() {
	app := cli.NewApp()
	app.Name = "nami"
	app.Version = "20200516"
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
			Usage: "Install package. $ nami install github.com/txthinking/nami",
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
					f, err := n.Install(v)
					if err != nil {
						return err
					}
					n.Print(v, false)
					if f != nil {
						defer f()
					}
				}
				return nil
			},
		},
		&cli.Command{
			Name:  "upgrade",
			Usage: "Upgrade package. $ nami upgrade github.com/txthinking/nami",
			Flags: []cli.Flag{
				&cli.BoolFlag{
					Name:    "all",
					Aliases: []string{"a"},
					Usage:   "Upgrade all packages. $ nami upgrade --all",
				},
			},
			Action: func(c *cli.Context) error {
				n, err := NewNami()
				if err != nil {
					return err
				}
				defer n.Close()
				if !c.Bool("all") {
					if c.Args().Len() == 0 {
						cli.ShowCommandHelp(c, "upgrade")
						return nil
					}
					for _, v := range c.Args().Slice() {
						f, err := n.Install(v)
						if err != nil {
							return err
						}
						n.Print(v, false)
						if f != nil {
							defer f()
						}
					}
					return nil
				}
				l, err := n.GetInstalledPackageList()
				if err != nil {
					return err
				}
				for _, v := range l {
					f, err := n.Install(v.Name)
					if err != nil {
						fmt.Println("Error", err)
						continue
					}
					n.Print(v.Name, false)
					if f != nil {
						defer f()
					}
				}
				return nil
			},
		},
		&cli.Command{
			Name:  "remove",
			Usage: "Remove package. $ nami remove github.com/txthinking/brook",
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
			Name:  "info",
			Usage: "Print package information. $ nami info github.com/txthinking/nami",
			Action: func(c *cli.Context) error {
				n, err := NewNami()
				if err != nil {
					return err
				}
				defer n.Close()
				if c.Args().Len() == 0 {
					cli.ShowCommandHelp(c, "info")
					return nil
				}
				n.Print(c.Args().Slice()[0], true)
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
			Usage: "Create or update a version with binaries directory, such as $ nami release github.com/txthinking/nami v1.1.1 ./binaries/",
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
				p, err := GetPublish(c.Args().Slice()[0])
				if err != nil {
					return err
				}
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
