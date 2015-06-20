# grunt-assert-command-line-tasks

> Prevents tasks from beeing passed as command line argument.

Grunt files tend to have a big amount of multi tasks and their configuration objects.
**This module allows you to prevent tasks and multi tasks beeing invoked by a command line argument directly.

This means you no longer need to be confident that such a (multi) task is not called, but you can actively prevent this.

## Getting Started
This plugin requires Grunt `>=0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-assert-command-line-tasks --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```javascript
require('grunt-assert-command-line-tasks')(grunt, ['list', 'of', 'protected', 'tasks']);
```

#### Example
The following example is a simple build cycle to build, test and deploy .Net assemblies.

Imagine what happens if one calls "grunt msbuild" or "grunt copy": nothing but errors one has to understand to use the build script in an appropriate way.

```javascript
//gruntfile.js

module.exports = function(grunt) {
    'use strict';
    
    // prevent the multi tasks from beeing invoked directly
    require('grunt-assert-command-line-tasks')(grunt, ['msbuild', 'mstest', 'copy', 'clean']);
    
    grunt.initConfig({
        clean: {
            dist: ['path/to/dist/folder'],
            test: ['path/to/unit/test/result/files', 'path/to/integration/test/result/files']
        }
        msbuild: {
			bin: {
				src: ['path/to/source.sln'],
				options: {
                    targets: ['Build']
					/* omitted further options for readablity */
				}
			},
			doc: {
				src: ['path/to/doc.sln'],
				options: {
                    targets: ['Build']
					/* omitted further options for readablity */
				}
			},
            clean: {
                src: ['path/to/source.sln', 'path/to/doc.sln'],
                options: {
                    targets: ['Clean']
                    /* omitted further options for readablity */
                }
                
            }
		},
        mstest: {
			unittest: {
                src: ['path/to/unit.test.dll'] 
            },
			integrationtest: {
                src: ['path/to/integration.test.dll'] 
            }
		},
        copy: {
            bin: {
                files: [/* binary files to dist folder */]
            },
            doc: {
                files: [/* documentation files to dist folder */]
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-msbuild');
	grunt.loadNpmTasks('grunt-mstest');
	
    // register your own tasks that are aware about the dependencies and the relation of the configured multi tasks
    grunt.registerTask('prepare', ['clean', 'msbuild:clean']);
    grunt.registerTask('compile', ['prepare', 'msbuild:bin']);
    grunt.registerTask('test', ['compile', 'mstest:unittest']);
    grunt.registerTask('deploy', ['test', 'mstest:integrationtest', 'copy:bin', 'msbuild:doc', 'copy:doc']);
    
}
```

## Changelog
* __v1.0.0:
    *initial commit

## Contributors

* [Michael Scheepers](https://github.com/mscheepers)

## License
Copyright (c) 2015 Michael Scheepers
Licensed under the MIT license.
