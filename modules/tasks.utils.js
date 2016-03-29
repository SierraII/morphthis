/* -------------------------------------------------------------------- */
/*

    Utils

*/
/* -------------------------------------------------------------------- */

var chalk = require("chalk");

module.exports = function(grunt){

    // default task
    grunt.registerTask("default", function(){

        grunt.task.run("ascii");
        grunt.task.run("prompt");
        grunt.task.run("post_prompt");

    });

    // display a message indicating the process if finished
    grunt.registerTask("show_done", function(){

        grunt.log.writeln("");

        var message = chalk.green.bold("Done!");
        var path = chalk.green.bold("Your Newly Signed APK Can Be Found In apk/build/apk-signed.apk");

        grunt.log.ok(message);
        grunt.log.ok(path);

    });

    // all tasks after that needs to happen after the dispay_image task goes within this wrapper
    grunt.registerTask("post_process", function(){

        grunt.task.run("open_location");

    });

};