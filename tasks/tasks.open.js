/* -------------------------------------------------------------------- */
/*

    Open

*/
/* -------------------------------------------------------------------- */

var chalk = require("chalk");

module.exports = function(grunt){

    // open the location of the config
    grunt.registerTask("open_configuration", function(){

        var message = chalk.yellow.bold.underline("Opening Secret Configuration.");
        grunt.log.writeln(message);

        grunt.task.run("open:config");

    });

    // open the location of the APK
    grunt.registerTask("open_location", function(){

        var message = chalk.yellow.bold.underline("Opening Build Folder.");
        grunt.log.writeln(message);

        grunt.task.run("open:apk");

    });

};