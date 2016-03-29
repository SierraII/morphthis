/* -------------------------------------------------------------------- */
/*

    Prompt

*/
/* -------------------------------------------------------------------- */

var chalk = require("chalk");

module.exports = function(grunt){

    // wrapper for running task from the selected prompt
    grunt.registerTask("post_prompt", function(){

        var choice = grunt.config("open_prompt.config");

        if (choice === "Sign APK"){

            // Clean The Build
            grunt.task.run("clean:apk_folder");
            grunt.task.run("sign");

        }

        if (choice === "Clean Build"){

            grunt.task.run("clean:apk_folder");
            grunt.task.run("default");

        }

        if (choice === "Update Packages"){

            grunt.task.run("exec:npm_update");
            grunt.task.run("default");

        }
        
        if (choice === "APK Info"){

            grunt.task.run("apk_info");
            grunt.task.run("default");
        }
        
        if (choice === "Keystore Info"){

            grunt.task.run("keystore_info");
            grunt.task.run("default");

        }

        if (choice === "Configuration"){

            grunt.task.run("open_configuration");

        }

    });

};