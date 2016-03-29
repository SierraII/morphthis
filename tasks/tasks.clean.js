var chalk = require("chalk");

module.exports = function(grunt){

    // clean the whole build directory
    grunt.registerTask("clean_build_contents", function(){

        var message = chalk.yellow.bold.underline("Cleaning Build Contents.");
        grunt.log.writeln(message);

        grunt.task.run("clean:apk_unzipped_folder");
        grunt.task.run("clean:apk_zipped_file");

    });

};