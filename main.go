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
	app.Usage = "A distributed binary package manager"
	app.Commands = []*cli.Command{
		&cli.Command{
			Name:  "install",
			Usage: "Install package. $ nami install github.com/txthinking/brook",
			Action: func(c *cli.Context) error {
				if c.Args().Len() == 0 {
					cli.ShowCommandHelp(c, "install")
					return nil
				}
				n, err := NewNami()
				if err != nil {
					return err
				}
				defer n.Close()
				for _, v := range c.Args().Slice() {
					if err := n.Install(v); err != nil {
						return err
					}
					n.Print(v, false)
				}
				return nil
			},
		},
		&cli.Command{
			Name:  "upgrade",
			Usage: "Upgrade package. $ nami upgrade github.com/txthinking/brook",
			Flags: []cli.Flag{
				&cli.BoolFlag{
					Name:  "all",
					Usage: "Upgrade all packages. $ nami upgrade --all",
				},
			},
			Action: func(c *cli.Context) error {
				n, err := NewNami()
				if err != nil {
					return err
				}
				defer n.Close()
				if c.Bool("all") {
					l, err := n.GetInstalledPackageList()
					if err != nil {
						return err
					}
					for _, v := range l {
						fmt.Println("Upgrading", v.Name)
						if err := n.Install(v.Name); err != nil {
							fmt.Println("Error", err)
						}
					}
					return nil
				}
				if c.Args().Len() == 0 {
					cli.ShowCommandHelp(c, "upgrade")
					return nil
				}
				for _, v := range c.Args().Slice() {
					if err := n.Install(v); err != nil {
						return err
					}
					n.Print(v, false)
				}
				return nil
			},
		},
		&cli.Command{
			Name:  "remove",
			Usage: "Remove package. $ nami remove github.com/txthinking/brook",
			Action: func(c *cli.Context) error {
				if c.Args().Len() == 0 {
					cli.ShowCommandHelp(c, "remove")
					return nil
				}
				n, err := NewNami()
				if err != nil {
					return err
				}
				defer n.Close()
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
			Usage: "Print package information. $ nami info github.com/txthinking/brook",
			Flags: []cli.Flag{
				&cli.BoolFlag{
					Name:  "remote",
					Usage: "With remote packages information. $ nami info --remote github.com/txthinking/brook",
				},
			},
			Action: func(c *cli.Context) error {
				if c.Args().Len() == 0 {
					cli.ShowCommandHelp(c, "info")
					return nil
				}
				n, err := NewNami()
				if err != nil {
					return err
				}
				defer n.Close()
				if c.Args().Len() == 2 {
					if c.Args().Slice()[0] == "--remote" {
						n.Print(c.Args().Slice()[1], true)
						return nil
					}
					if c.Args().Slice()[1] == "--remote" {
						n.Print(c.Args().Slice()[0], true)
						return nil
					}
				}
				n.Print(c.Args().Slice()[0], false)
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
	}
	if err := app.Run(os.Args); err != nil {
		log.Fatal(err)
	}
}
