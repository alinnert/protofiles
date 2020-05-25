package main

import (
	"fmt"
	"log"
	"os"
	"text/tabwriter"
)

func askForTemplate() {
	println("")
	println("  TEM")
	println("")

	var writer = tabwriter.NewWriter(os.Stdout, 0, 0, 4, ' ', 0)
	fmt.Fprintln(writer, "  NAME\tPATH")

	for _, template := range fetchAllTemplates() {
		var lineOutput = "  " + template.name + "\t" + template.path
		fmt.Fprintln(writer, lineOutput)
	}

	var err = writer.Flush()
	if err != nil {
		log.Fatal(err.Error())
	}
}

func loadTemplate() {

}

func configureTemplate() {

}

func compileTemplate() {

}
