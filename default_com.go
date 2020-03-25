package main

import (
	"errors"
	"fmt"
	"net/http"
	"time"

	"github.com/bitly/go-simplejson"
)

type Default struct {
	Client *http.Client
}

func NewDefault() *Default {
	return &Default{
		Client: &http.Client{
			Timeout: 10 * time.Second,
		},
	}
}

func (d *Default) Version(name string) (string, error) {
	s := fmt.Sprintf("https://%s/nami.json", name)
	r, err := d.Client.Get(s)
	if err != nil {
		return "", err
	}
	defer r.Body.Close()
	if r.StatusCode == 404 {
		return "", errors.New("This package doesn't support nami")
	}
	j, err := simplejson.NewFromReader(r.Body)
	if err != nil {
		return "", err
	}
	s, err = j.Get("version").String()
	if err != nil {
		return "", err
	}
	return s, nil
}

func (d *Default) Files(name string) ([]string, error) {
	s := fmt.Sprintf("https://%s/nami.json", name)
	r, err := d.Client.Get(s)
	if err != nil {
		return nil, err
	}
	defer r.Body.Close()
	if r.StatusCode == 404 {
		return nil, errors.New("This package doesn't support nami")
	}
	j, err := simplejson.NewFromReader(r.Body)
	if err != nil {
		return nil, err
	}
	l, err := j.Get("files").Array()
	if err != nil {
		return nil, err
	}
	l1 := make([]string, 0)
	for i := 0; i < len(l); i++ {
		s, err := j.Get("files").GetIndex(i).String()
		if err != nil {
			return nil, err
		}
		l1 = append(l1, s)
	}
	return l1, nil
}
