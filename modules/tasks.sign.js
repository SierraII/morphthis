var chalk = require("chalk");

module.exports = function(grunt){

    // core for signing the apk
    grunt.registerTask("sign", function(){

        // load the task timer
        require("time-grunt")(grunt);

        // PROCESS:
        // copy the APK
        // rename the file extention from APK to ZIP
        // extract the contents
        // delete the META-INF folder
        // zip or compress the contents
        // rename from ZIP to APK
        // use the keytool to sign the APK
        // zip align the newly signed APK

        grunt.task.run("apk_info");
        grunt.task.run("keystore_info");
        grunt.task.run("apk_copy");
        grunt.task.run("apk_rename_to_zip");
        grunt.task.run("apk_unzip");
        grunt.task.run("apk_delete_meta");
        grunt.task.run("apk_compress");
        grunt.task.run("apk_compress_rename");
        grunt.task.run("apk_sign");
        grunt.task.run("apk_signed_info");
        grunt.task.run("apk_zip_align");
        grunt.task.run("clean_build_contents");
        grunt.task.run("show_done");
        grunt.task.run("display_image");

    });

};