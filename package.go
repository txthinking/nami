package main

type Package struct {
	// Name is url without https://
	Name string
	// Installed version
	Version string
	// Binary file name and download url
	Files map[string]string
}
