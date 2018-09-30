# Protofiles

Protofiles lets you create new files based on your own templates and inputs in the command line.

## Install

This tool is written in TypeScript and based on Node.js.

~~~
npm install --global @protofiles/cli
~~~

## Overview

Protofiles is a CLI tool that renderes [Mustache](https://mustache.github.io) templates, populated with the input you provide in the command line. The generated files get stored at your configured location relative to your current directory.

You can use it to quickly bootstrap new projects, add new files that contain quite some boilerplate code (e.g. Controller Classes) etc.

## Things to keep in mind

Note, that currently **files get overwritten** if they already exist!

## Example

### Prepare your environment

Let's create a template for a simple Webpack configuration file.

Your tempaltes are located at:

~~~
~/.protofiles/
~~~

On Windows it is:

~~~
%USERPROFILE%\.protofiles\
~~~

If this folder doesn't exists, create it.

### Create the config file

Now create a folder for our Webpack template (named for example `webpack-base`) and a file `protofile.js` inside that folder. Now this file should exist:

~~~
~/.protofiles/webpack-base/protofile.js
~~~

Open that file and put the following content into it:

~~~ js
module.exports = {
  name: 'Webpack Base',
  description: 'This template creates a simple webpack configuration',
  inputs: [
    { name: 'entry', message: 'Name the entry file path:' },
    { name: 'outputFolder', message: 'Name the output directory:' },
    { name: 'outputFile', message: 'Name the output filename' }
  ],
  files (inputs) {
    return [
      { template: 'webpack.config', outputPath: 'webpack.config.js' }
    ]
  }
}
~~~

Let's break it down: This file exports an object. The properties `name` and `description` should be pretty much self-explanatory. They get displayed in the console and have no further meaning besides explanation what this template does.

The `inputs` property is the list of questions the user gets asked. Basically these are [Inquirer](https://github.com/SBoudrias/Inquirer.js/) question objects with `type` set to `input` by default. The `name` property has an additional meaning: You can access the input values by this very name in the following `files` function and in your Mustache templates. So make sure they are valid variable or property identifiers.

The `files` function controls which files should be created and what templates should be used to do so. This function returns an array of objects. That means you can create any number of files and make any of this information based on the user inputs.

- The `template` property specifies the template filename (excluding the `.mustache` file extension).
- The `outputPath` specifies the file that sould be created. You can enter any file path here, including any number of subfolders. Of course, parts of the path can also be based on the user's input.

### Create the template file

Now we also need a template. Since we specified a template named `webpack.config` in our `files` function we need to create a file called `webpack.config.mustache`. However, you can name it whatever you want. The name of the file that gets created is specified in the `outputPath` property. That way you can create several different templates for the same output file if its content is too heavily depending on the user's input.

Create the file `webpack.config.mustache` and put the following content into it:

~~~ mustache
const { resolve } = require('path')

module.exports = {
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  context: __dirname,
  entry: resolve(__dirname, '{{ entry }}'),
  output: {
    path: resolve(__dirname, '{{ outputFolder }}'),
    filename: '{{ outputFile }}'
  }
}
~~~

And done. As already mentioned in your templates you can access all input values by there `name`.

Notice: *Don't forget to wrap the mustaches in quotes if you want to output some value as a JavaScript string value*

### Use your new protofile

That's it. Now, pretend you have a shiny new project on your disk, `cd` into it and run:

~~~
proto webpack-base
~~~

The name `webpack-base` matches the folder name inside your `.protofiles` folder. After you've answered the questions you specified in your config - voilà - your new ready-to-go webpack config is in place.

## ToDo

- [ ] Allow the user to pass options on the CLI to prepopulate inputs (`commander.js` doesn't support this directly)
- [ ] Find a way to use external modules or libraries in template configurations
- [ ] Add a question if a file already exists