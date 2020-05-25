package main

import (
	"io/ioutil"
	"log"
	"os"
	"path/filepath"
	"strings"
)

type question struct {
	label string
}

type template struct {
	name, path string
	templates  [][]byte
	questions  []question
}

func findAllTemplates() []template {
	cwd, err := os.Getwd()
	if err != nil {
		log.Fatal("Cannot get CWD")
	}
	return checkFolder(cwd, nil, []template{})
}

func checkFolder(
	foldername string,
	previousFoldername *string,
	templates []template,
) []template {
	if previousFoldername != nil && foldername == *previousFoldername {
		return templates
	}

	protofilesFolder := filepath.Join(foldername, ".protofiles")
	files, _ := ioutil.ReadDir(protofilesFolder)

	for _, file := range files {
		if !file.IsDir() {
			continue
		}

		templateName := file.Name()
		templateFolder := filepath.Join(protofilesFolder, templateName)
		templateFolderContent, err := ioutil.ReadDir(templateFolder)
		if err != nil {
			log.Fatal(err.Error())
		}
		if len(templateFolderContent) < 2 {
			continue
		}

		templateFileContents := [][]byte{}

		for _, templateFile := range templateFolderContent {
			templateFileName := templateFile.Name()

			if strings.HasSuffix(templateFileName, ".mustache") {
				templateContent, err := ioutil.ReadFile(templateFileName)
				if err != nil {
					continue
				}

				templateFileContents = append(templateFileContents, templateContent)
			}
		}

		if len(templateFileContents) == 0 {
			continue
		}

		newTemplate := template{
			name:      templateName,
			path:      templateFolder,
			templates: templateFileContents,
			questions: []question{},
		}

		templates = append(templates, newTemplate)
	}

	return checkFolder(filepath.Join(foldername, ".."), &foldername, templates)
}
