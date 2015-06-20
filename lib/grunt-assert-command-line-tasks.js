/******************************************************************************
 * Script:  grunt-assert-command-line-tasks.js
 *
 * Prevents tasks from beeing passed as command line argument.
 * 
 * Usage:   In your gruntfile.js quite early
 * require('grunt-assert-command-line-tasks')(grunt, ['list', 'of', 'tasks', 'to', 'prevent']);
 *
 * Arguments:   grunt - the grunt object
 *              tasks - list of protected tasks
 *
 * Iterates through the tasks passed to grunt on the command line and will 
 * fail if a task contained in the list of protected tasks was passed. 
 * 
 * Version:     1.0.0
 * Author:      M.Scheepers <mscheepers@tool-links.de>
 ******************************************************************************/
/*jslint white:true*/
/*global module*/
module.exports = function(grunt, tasks) {
    'use strict';
    var clientTasks = grunt.cli.tasks,
        task = null,
        i = null;
    grunt.verbose.writeln('protected tasks: ' + tasks);
    grunt.verbose.writeln('specified tasks: ' + clientTasks);
    for(i in clientTasks) {
        if (clientTasks[i] !== 'function') {
            task = clientTasks[i];
            if (tasks.indexOf(task) !== -1) {
                grunt.fatal('Invocation of the protected "' + task + '" task from the command line is not allowed.');
            }
        }
    }
    grunt.verbose.ok('Passed task(s) ' + clientTasks + ' are allowed.');
};
