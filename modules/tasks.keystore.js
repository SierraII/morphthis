var chalk = require("chalk");

module.exports = function(grunt){

    // display the currently selected Keystore information
    grunt.registerTask("keystore_info", function(){

        var message = chalk.yellow.bold.underline("Displaying Current Keystore Information.");
        grunt.log.writeln(message);

        grunt.task.run("exec:keystore_info");
      
    });

};