/* -------------------------------------------------------------------- */
/*

    APK Related Tasks

*/
/* -------------------------------------------------------------------- */
var chalk = require("chalk");

module.exports = function(grunt){

    // display the currently selected APK information
    grunt.registerTask("apk_info", function(){

        var message = chalk.yellow.bold.underline("Displaying Current APK Information.");
        grunt.log.writeln(message);

        grunt.task.run("exec:apk_origunal_info");

    });

    // copy the APK for backup
    grunt.registerTask("apk_copy", function(){

        var message = chalk.yellow.bold.underline("Copying Current APK.\nThe Origunal APK can be found as apk/backup");
        grunt.log.writeln(message);

        grunt.task.run("copy:apk");

    });

    // change the extention from APK to ZIP
    grunt.registerTask("apk_rename_to_zip", function(){

        var message = chalk.yellow.bold.underline("Renameing Current APK To ZIP");
        grunt.log.writeln(message);

        grunt.task.run("rename:apk");

    });

    // unzip the contents
    grunt.registerTask("apk_unzip", function(){

        var message = chalk.yellow.bold.underline("Unzipping Compressed File.");
        grunt.log.writeln(message);

        grunt.task.run("unzip");
      
    });

    // delete the META-INF directory from the folder
    grunt.registerTask("apk_delete_meta", function(){

        var message = chalk.yellow.bold.underline("Removing Signing/META-INF.");
        grunt.log.writeln(message);

        grunt.task.run("clean:meta_inf");

    });

    // compress the folder that has the META-INF folder deleted
    grunt.registerTask("apk_compress", function(){

        var message = chalk.yellow.bold.underline("Compressing Unsigned APK Into ZIP.");
        grunt.log.writeln(message);

        grunt.task.run("compress:meta_removed");

    });

    // compress the new folder
    grunt.registerTask("apk_compress_rename", function(){

        var message = chalk.yellow.bold.underline("Renaming Compressed ZIP TO APK.");
        grunt.log.writeln(message);

        grunt.task.run("rename:meta_removed");

    });

    // sign the APK with the keytool
    grunt.registerTask("apk_sign", function(){

        var message = chalk.yellow.bold.underline("Signing APK With Keystore File.");
        grunt.log.writeln(message);

        grunt.task.run("exec:apk_sign");

    });
    
    // execute the zip align command to align the new APK
    grunt.registerTask("apk_zip_align", function(){

        var message = chalk.yellow.bold.underline("Running ZipAlign On Newly Signed APK.");
        grunt.log.writeln(message);

        grunt.task.run("exec:zip_align");

    });

    // display the new APK information
    grunt.registerTask("apk_signed_info", function(){

        var message = chalk.yellow.bold.underline("Displaying Newly Signed APK Information.");
        grunt.log.writeln(message);

        grunt.task.run("exec:apk_new_signed_info");

    });

};