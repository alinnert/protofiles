package main

import (
	"io/ioutil"
	"log"
	"os"
	"path/filepath"
)

type question struct {
	label string
}

type templateMetadata struct {
	name, path string
}

func fetchAllTemplates() []templateMetadata {
	var cwd, err = os.Getwd()
	if err != nil {
		log.Fatal("Cannot get CWD")
	}
	return checkFolderRecursive(cwd, nil, []templateMetadata{})
}

func checkFolderRecursive(
	foldername string,
	previousFoldername *string,
	templates []templateMetadata,
) []templateMetadata {
	if previousFoldername != nil && foldername == *previousFoldername {
		return templates
	}

	var protofilesFolder = filepath.Join(foldername, templatesFolderName)
	var files, _ = ioutil.ReadDir(protofilesFolder)

	for _, file := range files {
		if !file.IsDir() {
			continue
		}

		var templateName = file.Name()
		var templateFolder = filepath.Join(protofilesFolder, templateName)
		var templateFolderContent, err = ioutil.ReadDir(templateFolder)
		if err != nil {
			log.Fatal(err.Error())
		}
		if len(templateFolderContent) < 2 {
			continue
		}

		var newTemplate = templateMetadata{
			name: templateName,
			path: templateFolder,
		}

		templates = append(templates, newTemplate)
	}

	return checkFolderRecursive(
		filepath.Join(foldername, ".."), &foldername, templates,
	)
}

// func foo() {
// 	for _, file := range files {
// 		var templateFileContents = [][]byte{}

// 		for _, templateFile := range templateFolderContent {
// 			var templateFileName = templateFile.Name()

// 			if strings.HasSuffix(templateFileName, ".mustache") {
// 				var templateContent, err = ioutil.ReadFile(templateFileName)
// 				if err != nil {
// 					continue
// 				}

// 				templateFileContents = append(templateFileContents, templateContent)
// 			}
// 		}

// 		if len(templateFileContents) == 0 {
// 			continue
// 		}
// 	}
// }
