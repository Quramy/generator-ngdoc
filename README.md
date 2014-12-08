# generator-ngdoc

This is a Yeoman generator for documentation of AngularJS modules.

This generator scaffolds:

+ a WebApp like [AngularJS document's site](https://angularjs.org/)
+ gulp tasks to process ngDoc annotations in your JavaScript codes such as:

```js
/**
*
* @ngdoc directive
* @name awesomeElement
* @module myModule
* @restrict E
* @descrition
* This is an awesome directive!
*
**/
angular.module('myModule')
  .directive('awesomeElement', function () {
    return {
      // Derective definision...
    };
  });
```

## Why?
As the originator, I want to write documents of my AngualrJS module in ngdoc notation and to publish them as a web application.

I choose [Dgeni](https://github.com/angular/dgeni) and [dgeni-packages](https://github.com/angular/dgeni-packages) as the ngdoc processor.
These packages generate partial html contents of api, they don't generate an application that integrate these partial pages.

So, this generator scaffolds not only Dgeni configurations but also an application of documents.


## Demo site
[Here](https://quramy.github.io/example-of-generator-ngdoc/index.html) is a demo site generated with this generator. 

## Usage

To install yeoman and generator-dgeni from npm, run:

```bash
npm install -g yo generator-ngdoc
```

Create a project directory and change the current directory.

```bash
mkdir my-anguar-module
cd my-angular-module
```

Initiate the generator:

```bash
yo ngdoc
```

Change the current to `docs` directory:

```bash
cd docs
```

Run gulp task:

```
gulp docs:serve
```

A web application of documentation starts in your browser.

### I already have a module project, can I use this generator?
No problem. This generator is designed for adding onto existing projects.

Almost all of the files are created under only `docs` directory (see also [directory structure](#directory-structure)).

If you has a project whose name `your-module` which was generated by other generator(e.g. [generator-gulp-angular](https://github.com/Swiip/generator-gulp-angular)):

```bash
cd your-module
yo ngdoc
cd docs
gulp docs:serve
```

If necessary, you can modify the settings for the location of source files.
By default, the gulp task searchs source files from `src/**/*.js`

+ `docs/gulp/dgeni.js`

```js
    var dgeni = new Dgeni([require('../config/')
      .config(function (readFilesProcessor, writeFilesProcessor) {
        //
        
        // Specify collections of source files that should contain the documentation to extract
        readFilesProcessor.sourceFiles = [{include: 'src/**/*.js', basePath: 'src'}, {include: 'docs/content/**/*.ngdoc',basePath: 'docs/content'}];

        //
      })
      :
```


### Gulp Tasks
__You should run any gulp tasks generated by `generator-ngdoc` in 'docs' directory.__

```bash
cd docs
```

#### `docs:serve`
Generate ngdoc and run document application on Node.js server.

```bash
gulp docs:serve
```

This task wathes your JavaScript source files.
If you modify these files, re-generate ngdocs and reload browser.

#### `docs:build`
Build document application package, and place in directory 'docs/dist'

```bash
gulp docs:build
```

#### `docs:serve:dist`
Run document application package created by `docs:build` task on Node.js server.

```bash
gulp docs:serve:dist
```

### Directory structure

```
├──  src/                         Put your source files in this dir
│   └──  components/
│        ├──  sample/             Sample components's source files generated by generator-ngdoc
│        └──  index.js            Module definition is written in this
│
├──  docs/                        Sub dir for documentation
│   ├──  .tmp/                    
│   ├──  app/                     Documentation app root directory
│   │   ├──  src/
│   │   ├──  styles/
│   │   └──  index.html
│   ├──  bower_components/
│   ├──  config/                  Dgeni configurations
│   │   ├──  processors/
│   │   ├──  templates/
│   │   └──  index.js
│   ├──  content/                 Additional documentation sources
│   │   ├──  guide/
│   │   ├──  api.ngdoc
│   │   ├──  guide.ngdoc
│   │   └──  index.ngdoc
│   ├──  dist/                    The destination directory of the gulp task 'docs:build'
│   ├──  gulp/                    Definition of gulp tasks
│   ├──  lib/                     Misc node modules
│   ├──  node_modules/
│   ├──  bower.json               Bower configuration for documentation app
│   ├──  gulpfile.js
│   └──  package.json             Node configuration to build documentation app
│
├──  .gitignore
├──  bower_components/
└──  bower.json                   Bower configuration for your modules
```


## License

MIT
