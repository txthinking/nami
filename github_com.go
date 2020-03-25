package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/bitly/go-simplejson"
)

type Github struct {
	Client *http.Client
}

func NewGithub() *Github {
	return &Github{
		Client: &http.Client{
			Timeout: 10 * time.Second,
		},
	}
}

func (g *Github) Version(name string) (string, error) {
	s := fmt.Sprintf("https://api.github.com/repos%s/releases/latest", name[10:])
	r, err := g.Client.Get(s)
	if err != nil {
		return "", err
	}
	defer r.Body.Close()
	j, err := simplejson.NewFromReader(r.Body)
	if err != nil {
		return "", err
	}
	s, err = j.Get("tag_name").String()
	if err != nil {
		return "", err
	}
	return s, nil
}

func (g *Github) Files(name string) ([]string, error) {
	s := fmt.Sprintf("https://api.github.com/repos%s/releases/latest", name[10:])
	r, err := g.Client.Get(s)
	if err != nil {
		return nil, err
	}
	defer r.Body.Close()
	j, err := simplejson.NewFromReader(r.Body)
	if err != nil {
		return nil, err
	}
	l, err := j.Get("assets").Array()
	if err != nil {
		return nil, err
	}
	l1 := make([]string, 0)
	for i := 0; i < len(l); i++ {
		s, err := j.Get("assets").GetIndex(i).Get("browser_download_url").String()
		if err != nil {
			return nil, err
		}
		l1 = append(l1, s)
	}
	return l1, nil
}
