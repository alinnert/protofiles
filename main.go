package main

import (
	"os"
)

func main() {
	argsCount := len(os.Args)

	if argsCount > 2 {
		println("Protofiles only accepts one argument")
	} else if argsCount == 1 {
		askForTemplate()
	} else {
		arg := os.Args[1]

		switch arg {
		case "--version":
			fallthrough
		case "-v":
			println("Protofiles version 0.0.1")

		case "--help":
			fallthrough
		case "-h":
			println("How to use Protofiles...")

		default:
			println("Compile template " + arg)
		}
	}
}
