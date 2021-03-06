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
	"regexp"
	"testing"
)

func TestTest(t *testing.T) {
	log.Println(regexp.MustCompile(`^.*_(darwin|freebsd|linux|netbsd|openbsd|windows)_(386|amd64|arm64|)(.exe)?$`).MatchString("1_1.1_a_linux_amd64"))
}
