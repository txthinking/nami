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
	"strings"
	"testing"
)

func TestTest(t *testing.T) {
	v := "https://github.com/txthinking/nami/releases/download/v20200509/nami_windows_amd64.exe"
	sfx := "_windows_amd64"
	if !strings.HasSuffix(v, sfx+".exe") {
		return
	}
	log.Println(v[strings.LastIndex(v, "/")+1:len(v)-len(sfx)-4] + ".exe")
}
