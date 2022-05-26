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
	"os"
	"os/exec"
	"runtime"

	"github.com/d5/tengo/v2"
	"github.com/d5/tengo/v2/stdlib"
)

func (n *Nami) Module() {
	var namiModule = map[string]tengo.Object{
		"os":         &tengo.String{Value: runtime.GOOS},
		"arch":       &tengo.String{Value: runtime.GOARCH},
		"home_dir":   &tengo.String{Value: n.HomeDir},
		"bin_dir":    &tengo.String{Value: n.BinDir},
		"cache_dir":  &tengo.String{Value: n.CacheDir},
		"copied_dir": &tengo.String{Value: n.CopiedDir},
		"tmp_dir":    &tengo.String{Value: n.TmpDir},
		"append_file": &tengo.UserFunction{
			Value: func(args ...tengo.Object) (tengo.Object, error) {
				if len(args) < 2 {
					return nil, tengo.ErrWrongNumArguments
				}
				s, ok := tengo.ToString(args[0])
				if !ok {
					return nil, tengo.ErrInvalidArgumentType{
						Name:     "first",
						Expected: "string(compatible)",
						Found:    args[0].TypeName(),
					}
				}
				s1, ok := tengo.ToString(args[1])
				if !ok {
					return nil, tengo.ErrInvalidArgumentType{
						Name:     "second",
						Expected: "string(compatible)",
						Found:    args[1].TypeName(),
					}
				}
				f, err := os.OpenFile(s, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0666)
				if err != nil {
					return &tengo.Error{Value: &tengo.String{Value: err.Error()}}, nil
				}
				defer f.Close()
				if _, err := f.Write([]byte(s1)); err != nil {
					return &tengo.Error{Value: &tengo.String{Value: err.Error()}}, nil
				}
				return tengo.TrueValue, nil
			},
		},
		"write_file": &tengo.UserFunction{
			Value: func(args ...tengo.Object) (tengo.Object, error) {
				if len(args) < 2 {
					return nil, tengo.ErrWrongNumArguments
				}
				s, ok := tengo.ToString(args[0])
				if !ok {
					return nil, tengo.ErrInvalidArgumentType{
						Name:     "first",
						Expected: "string(compatible)",
						Found:    args[0].TypeName(),
					}
				}
				s1, ok := tengo.ToString(args[1])
				if !ok {
					return nil, tengo.ErrInvalidArgumentType{
						Name:     "second",
						Expected: "string(compatible)",
						Found:    args[1].TypeName(),
					}
				}
				err := os.WriteFile(s, []byte(s1), 0666)
				if err != nil {
					return &tengo.Error{Value: &tengo.String{Value: err.Error()}}, nil
				}
				return tengo.TrueValue, nil
			},
		},
		"sh1": &tengo.UserFunction{
			Value: func(args ...tengo.Object) (tengo.Object, error) {
				if len(args) == 0 {
					return nil, tengo.ErrWrongNumArguments
				}
				name, ok := tengo.ToString(args[0])
				if !ok {
					return nil, tengo.ErrInvalidArgumentType{
						Name:     "first",
						Expected: "string(compatible)",
						Found:    args[0].TypeName(),
					}
				}
				var execArgs []string
				for idx, arg := range args[1:] {
					execArg, ok := tengo.ToString(arg)
					if !ok {
						return nil, tengo.ErrInvalidArgumentType{
							Name:     fmt.Sprintf("args[%d]", idx),
							Expected: "string(compatible)",
							Found:    args[1+idx].TypeName(),
						}
					}
					execArgs = append(execArgs, execArg)
				}
				cmd := exec.Command(name, execArgs...)
				cmd.Stderr = os.Stderr
				b, err := cmd.Output()
				if err != nil {
					return &tengo.Error{Value: &tengo.String{Value: err.Error()}}, nil
				}
				return &tengo.Bytes{Value: b}, nil
			},
		},
		"sh": &tengo.UserFunction{
			Value: func(args ...tengo.Object) (tengo.Object, error) {
				if len(args) == 0 {
					return nil, tengo.ErrWrongNumArguments
				}
				name, ok := tengo.ToString(args[0])
				if !ok {
					return nil, tengo.ErrInvalidArgumentType{
						Name:     "first",
						Expected: "string(compatible)",
						Found:    args[0].TypeName(),
					}
				}
				var execArgs []string
				for idx, arg := range args[1:] {
					execArg, ok := tengo.ToString(arg)
					if !ok {
						return nil, tengo.ErrInvalidArgumentType{
							Name:     fmt.Sprintf("args[%d]", idx),
							Expected: "string(compatible)",
							Found:    args[1+idx].TypeName(),
						}
					}
					execArgs = append(execArgs, execArg)
				}
				cmd := exec.Command(name, execArgs...)
				cmd.Stderr = os.Stderr
				cmd.Stdout = os.Stdout
				err := cmd.Run()
				if err != nil {
					return &tengo.Error{Value: &tengo.String{Value: err.Error()}}, nil
				}
				return tengo.TrueValue, nil
			},
		},
	}
	stdlib.BuiltinModules["nami"] = namiModule
}
