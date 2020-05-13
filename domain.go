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
	"strings"
)

// Domain is a website we support.
type Domain interface {
	// Name is url without https://, return the latest version.
	Version(name string) (string, error)
	// Name is url without https://,
	// return the binary name and latest version download url.
	Files(name string) ([]string, error)
}

// Name is url without https://.
func GetDomain(name string) Domain {
	// Register github.com
	if strings.HasPrefix(name, "github.com") {
		return &GithubDomain{}
	}
	return &SelfDomain{}
}
