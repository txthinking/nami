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
		return NewGithub()
	}
	return NewDefault()
}
