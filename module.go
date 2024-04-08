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
	"path/filepath"
	"runtime"
	"strings"

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
		"cp": &tengo.UserFunction{
			Value: func(args ...tengo.Object) (tengo.Object, error) {
				if len(args) != 2 && len(args) != 3 {
					return nil, tengo.ErrWrongNumArguments
				}
				sh := func(s string) error {
					cmd := exec.Command("sh", "-c", s)
					cmd.Stderr = os.Stderr
					cmd.Stdout = os.Stdout
					return cmd.Run()
				}
				from, ok := tengo.ToString(args[0])
				if !ok {
					return nil, tengo.ErrInvalidArgumentType{
						Name:     "first",
						Expected: "string(compatible)",
						Found:    args[0].TypeName(),
					}
				}
				var out string
				if strings.HasSuffix(from, ".zip") {
					out = "_.zip"
					if err := sh("which 7z"); err != nil {
						return &tengo.Error{Value: &tengo.String{Value: "need 7z, recommend $ nami install 7z"}}, nil
					}
				}
				if strings.HasSuffix(from, ".tar.gz") || strings.HasSuffix(from, ".tgz") {
					out = "_.tgz"
				}
				if strings.HasSuffix(from, ".tar.xz") || strings.HasSuffix(from, ".txz") {
					out = "_.txz"
				}
				if out == "" {
					to, ok := tengo.ToString(args[1])
					if !ok {
						return nil, tengo.ErrInvalidArgumentType{
							Name:     "second",
							Expected: "string(compatible)",
							Found:    args[1].TypeName(),
						}
					}
					if strings.HasPrefix(from, "https://") || strings.HasSuffix(from, "http://") {
						if err := sh(fmt.Sprintf(`curl -L --progress-bar "%s" -o "%s"`, from, to)); err != nil {
							return &tengo.Error{Value: &tengo.String{Value: err.Error()}}, nil
						}
					} else {
						if err := sh(fmt.Sprintf(`cp "%s" "%s"`, from, to)); err != nil {
							return &tengo.Error{Value: &tengo.String{Value: err.Error()}}, nil
						}
					}
					return tengo.TrueValue, nil
				}
				if strings.HasPrefix(from, "https://") || strings.HasSuffix(from, "http://") {
					if err := sh(fmt.Sprintf(`curl -L --progress-bar "%s" -o "/tmp/%s"`, from, out)); err != nil {
						return &tengo.Error{Value: &tengo.String{Value: err.Error()}}, nil
					}
				} else {
					if err := sh(fmt.Sprintf(`cp "%s" "/tmp/%s"`, from, out)); err != nil {
						return &tengo.Error{Value: &tengo.String{Value: err.Error()}}, nil
					}
				}
				if err := sh(`rm -rf /tmp/_`); err != nil {
					return &tengo.Error{Value: &tengo.String{Value: err.Error()}}, nil
				}
				if err := sh(`mkdir /tmp/_`); err != nil {
					return &tengo.Error{Value: &tengo.String{Value: err.Error()}}, nil
				}
				if strings.HasSuffix(out, ".zip") {
					if err := sh(fmt.Sprintf(`7z x /tmp/%s -o/tmp/_`, out)); err != nil {
						return &tengo.Error{Value: &tengo.String{Value: err.Error()}}, nil
					}
				}
				if strings.HasSuffix(out, ".tgz") {
					if err := sh(fmt.Sprintf(`tar zxf /tmp/%s -C /tmp/_`, out)); err != nil {
						return &tengo.Error{Value: &tengo.String{Value: err.Error()}}, nil
					}
				}
				if strings.HasSuffix(out, ".txz") {
					if err := sh(fmt.Sprintf(`tar Jxf /tmp/%s -C /tmp/_`, out)); err != nil {
						return &tengo.Error{Value: &tengo.String{Value: err.Error()}}, nil
					}
				}
				// if len(args) == 3 {
				// 	a, ok := tengo.ToString(args[1])
				// 	if !ok {
				// 		return nil, tengo.ErrInvalidArgumentType{
				// 			Name:     "second",
				// 			Expected: "string(compatible)",
				// 			Found:    args[1].TypeName(),
				// 		}
				// 	}
				// 	b, ok := tengo.ToString(args[2])
				// 	if !ok {
				// 		return nil, tengo.ErrInvalidArgumentType{
				// 			Name:     "third",
				// 			Expected: "string(compatible)",
				// 			Found:    args[2].TypeName(),
				// 		}
				// 	}
				// 	if err := sh(fmt.Sprintf(`cp "/tmp/_/%s" "%s"`, a, b)); err != nil {
				// 		return &tengo.Error{Value: &tengo.String{Value: err.Error()}}, nil
				// 	}
				// 	return tengo.TrueValue, nil
				// }
				m, ok := args[1].(*tengo.Map)
				if !ok {
					return nil, tengo.ErrInvalidArgumentType{
						Name:     "second",
						Expected: "map(compatible)",
						Found:    args[1].TypeName(),
					}
				}
				for a, b0 := range m.Value {
					b, ok := tengo.ToString(b0)
					if !ok {
						return nil, tengo.ErrInvalidArgumentType{
							Name:     "second",
							Expected: "map[string]string(compatible)",
							Found:    args[1].TypeName(),
						}
					}
					if err := sh(fmt.Sprintf(`cp "/tmp/_/%s" "%s"`, a, b)); err != nil {
						return &tengo.Error{Value: &tengo.String{Value: err.Error()}}, nil
					}
				}
				return tengo.TrueValue, nil
			},
		},
		"cp_dir": &tengo.UserFunction{
			Value: func(args ...tengo.Object) (tengo.Object, error) {
				if len(args) != 3 {
					return nil, tengo.ErrWrongNumArguments
				}
				sh := func(s string) error {
					cmd := exec.Command("sh", "-c", s)
					cmd.Stderr = os.Stderr
					cmd.Stdout = os.Stdout
					return cmd.Run()
				}
				from, ok := tengo.ToString(args[0])
				if !ok {
					return nil, tengo.ErrInvalidArgumentType{
						Name:     "first",
						Expected: "string(compatible)",
						Found:    args[0].TypeName(),
					}
				}
				var out string
				if strings.HasSuffix(from, ".zip") {
					out = "_.zip"
					if err := sh("which 7z"); err != nil {
						return &tengo.Error{Value: &tengo.String{Value: "need 7z, recommend $ nami install 7z"}}, nil
					}
				}
				if strings.HasSuffix(from, ".tar.gz") || strings.HasSuffix(from, ".tgz") {
					out = "_.tgz"
				}
				if strings.HasSuffix(from, ".tar.xz") || strings.HasSuffix(from, ".txz") {
					out = "_.txz"
				}
				if out == "" {
					return &tengo.Error{Value: &tengo.String{Value: "first argument should be a compressed file"}}, nil
				}
				if strings.HasPrefix(from, "https://") || strings.HasSuffix(from, "http://") {
					if err := sh(fmt.Sprintf(`curl -L --progress-bar "%s" -o "/tmp/%s"`, from, out)); err != nil {
						return &tengo.Error{Value: &tengo.String{Value: err.Error()}}, nil
					}
				} else {
					if err := sh(fmt.Sprintf(`cp "%s" "/tmp/%s"`, from, out)); err != nil {
						return &tengo.Error{Value: &tengo.String{Value: err.Error()}}, nil
					}
				}
				if err := sh(`rm -rf /tmp/_`); err != nil {
					return &tengo.Error{Value: &tengo.String{Value: err.Error()}}, nil
				}
				if err := sh(`mkdir /tmp/_`); err != nil {
					return &tengo.Error{Value: &tengo.String{Value: err.Error()}}, nil
				}
				if strings.HasSuffix(out, ".zip") {
					if err := sh(fmt.Sprintf(`7z x /tmp/%s -o/tmp/_`, out)); err != nil {
						return &tengo.Error{Value: &tengo.String{Value: err.Error()}}, nil
					}
				}
				if strings.HasSuffix(out, ".tgz") {
					if err := sh(fmt.Sprintf(`tar zxf /tmp/%s -C /tmp/_`, out)); err != nil {
						return &tengo.Error{Value: &tengo.String{Value: err.Error()}}, nil
					}
				}
				if strings.HasSuffix(out, ".txz") {
					if err := sh(fmt.Sprintf(`tar Jxf /tmp/%s -C /tmp/_`, out)); err != nil {
						return &tengo.Error{Value: &tengo.String{Value: err.Error()}}, nil
					}
				}
				m, ok := args[1].(*tengo.Map)
				if !ok {
					return nil, tengo.ErrInvalidArgumentType{
						Name:     "second",
						Expected: "map(compatible)",
						Found:    args[1].TypeName(),
					}
				}
				for a, b0 := range m.Value {
					b, ok := tengo.ToString(b0)
					if !ok {
						return nil, tengo.ErrInvalidArgumentType{
							Name:     "second",
							Expected: "map[string]string(compatible)",
							Found:    args[1].TypeName(),
						}
					}
					if err := sh(fmt.Sprintf(`mv "/tmp/_/%s" "%s"`, a, b)); err != nil {
						return &tengo.Error{Value: &tengo.String{Value: err.Error()}}, nil
					}
				}
				l, ok := args[2].(*tengo.Array)
				if !ok {
					return nil, tengo.ErrInvalidArgumentType{
						Name:     "third",
						Expected: "array(compatible)",
						Found:    args[2].TypeName(),
					}
				}
				links := []string{}
				for _, v := range l.Value {
					s, ok := tengo.ToString(v)
					if !ok {
						return nil, tengo.ErrInvalidArgumentType{
							Name:     "third",
							Expected: "[string](compatible)",
							Found:    args[2].TypeName(),
						}
					}
					links = append(links, s)
				}
				err := os.WriteFile(filepath.Join(n.CacheDir, "links"), []byte(strings.Join(links, "\n")), 0666)
				if err != nil {
					return &tengo.Error{Value: &tengo.String{Value: err.Error()}}, nil
				}
				return tengo.TrueValue, nil
			},
		},
	}
	stdlib.BuiltinModules["nami"] = namiModule
}
