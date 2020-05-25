package main

import (
	"os"
)

const templatesFolderName = ".templates"

func main() {
	var argsCount = len(os.Args)

	if argsCount > 2 {
		println("Tem only accepts one argument")
	} else if argsCount == 1 {
		askForTemplate()
	} else {
		var arg = os.Args[1]

		switch arg {
		case "--version":
			fallthrough
		case "-v":
			println("Tem version 0.0.1")

		case "--help":
			fallthrough
		case "-h":
			println("How to use Tem...")

		default:
			println("Compile template " + arg)
		}
	}
}
