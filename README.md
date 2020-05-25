# Tem

Tem is a CLI that lets you create new files based on [Mustache](https://mustache.github.io) templates you define.

## CLI Usage

### List all available templates

~~~
tem
~~~

### Use a template

~~~
tem some-template-id
~~~

### Show help

~~~
tem --help
tem -h
~~~

### Show version

~~~
tem --version
tem -v
~~~

## Create a template

### The `.templates` folders

Tem looks for templates in folders named `.templates` starting from your current working directory up to the root of the file system.

If your CWD is `C:\projects\my-project` Tem will look for the following folders:

- `C:\projects\my-project\.templates`
- `C:\projects\.templates`
- `C:\.templates`

This means you can override templates in subfolders and create global as well as project specific templates.

### The `.templates/*` folders

The `.templates` folder contains one subfolder per actual template. The folder name is the template's ID. This folder contains one `config.json` plus any number of actual Mustache templates.

Here's an example:

~~~
.templates
|- some-template
   |- config.json
   |- some-template.mustache
|- another-template
   |- config.json
   |- some-other-template.mustache
~~~

### The `config.json` file

~~~ json
{
  "name": "Readable name of the template",
  "description": "Some additional description",
  "templates": [
    {
      "file": "some-template.mustache",
      "output": "src/index.js"
    }
  ]
}
~~~

### Questions

A template can add a set of questions that will be asked if that template is going to be used. These questions help generating the new files by asking the user about file names, file content etc.

(WIP)