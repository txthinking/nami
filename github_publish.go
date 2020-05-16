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
	"context"
	"errors"
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"regexp"
	"strings"

	"github.com/google/go-github/github"
	"golang.org/x/oauth2"
)

type GithubPublish struct {
	Client *github.Client
}

func (g *GithubPublish) Init(n *Nami) error {
	s, err := n.GetConfig("github.token")
	if err != nil {
		return err
	}
	if s == "" {
		return errors.New("Please config github.token first: $ nami config github.token TOKEN")
	}
	ctx := context.Background()
	ts := oauth2.StaticTokenSource(
		&oauth2.Token{AccessToken: s},
	)
	tc := oauth2.NewClient(ctx, ts)
	g.Client = github.NewClient(tc)
	return nil
}

func (g *GithubPublish) Latest(name string) (string, error) {
	l := strings.Split(name, "/")
	if len(l) != 3 {
		return "", errors.New("Invalid github package name")
	}

	ctx := context.Background()
	l1, _, err := g.Client.Repositories.ListReleases(ctx, l[1], l[2], nil)
	if err != nil {
		return "", err
	}
	if len(l1) == 0 {
		return "", nil
	}
	return *(l1[0].TagName), nil
}

func (g *GithubPublish) Release(name, version, dir string) error {
	l := strings.Split(name, "/")
	if len(l) != 3 {
		return errors.New("Invalid github package name")
	}

	ctx := context.Background()
	r, _, err := g.Client.Repositories.GetReleaseByTag(ctx, l[1], l[2], version)
	if err != nil {
		if !strings.Contains(err.Error(), "404") {
			return err
		}
		fmt.Println("Creating release")
		r, _, err = g.Client.Repositories.CreateRelease(ctx, l[1], l[2], &github.RepositoryRelease{
			TagName: &version,
			Name:    &version,
		})
		if err != nil {
			return err
		}
	}
	if len(r.Assets) > 0 {
		fmt.Println("Deleting old assets")
	}
	for _, v := range r.Assets {
		_, err := g.Client.Repositories.DeleteReleaseAsset(ctx, l[1], l[2], *(v.ID))
		if err != nil {
			return err
		}
	}

	l1, err := ioutil.ReadDir(dir)
	if err != nil {
		return err
	}
	re := regexp.MustCompile(`^.*_(darwin|freebsd|linux|netbsd|openbsd|windows)_(386|amd64|arm64|)(.exe)?$`)
	for _, v := range l1 {
		if v.IsDir() {
			continue
		}
		if !re.MatchString(v.Name()) {
			fmt.Println("Warning, not nami file name format: " + filepath.Join(dir, v.Name()))
		}
		fmt.Println("Uploading " + filepath.Join(dir, v.Name()))
		f, err := os.Open(filepath.Join(dir, v.Name()))
		if err != nil {
			return err
		}
		defer f.Close()
		_, _, err = g.Client.Repositories.UploadReleaseAsset(ctx, l[1], l[2], *(r.ID), &github.UploadOptions{
			Name: v.Name(),
		}, f)
		if err != nil {
			return err
		}
	}
	return nil
}
