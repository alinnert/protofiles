package main

func askForTemplate() {
	templates := findAllTemplates()
	for _, template := range templates {
		println(template.path + " / " + template.name)
	}
}

func loadTemplate() {

}

func configureTemplate() {

}

func compileTemplate() {

}
