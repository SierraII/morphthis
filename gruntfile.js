var chalk = require("chalk");
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON("package.json"),
    secret: grunt.file.readJSON("secret.json"),

    rename: {
        apk: {
            src: "apk/app.apk",
            dest: "apk/build/apk_zipped.zip"
        },
        meta_removed: {
            src: "apk/build/meta_removed.zip",
            dest: "apk/build/app-unsigned.apk"
        },
    },

    exec: {
        apk_origunal_info: "keytool -list -printcert -jarfile <%= secret.apk_path %>",
        apk_new_signed_info: "keytool -list -printcert -jarfile apk/build/app-unsigned.apk",
        zip_align: "<%= secret.zip_align_path %> -v 4 apk/build/app-unsigned.apk apk/build/app-signed.apk",
        apk_sign: "jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -storepass <%= secret.keystore_password %> -keystore <%= secret.keystore_path %> apk/build/app-unsigned.apk 1"
    },

    copy: {
        apk: {
            files: [
              {expand: true, src: ["<%= secret.apk_path %>"], dest: "apk/backup", filter: "isFile"},
            ],
        },
    },
    
    unzip: {
        "apk/build/apk_unzipped": "apk/build/apk_zipped.zip"
    },
    
    clean: {
        meta_inf: ["apk/build/apk_unzipped/META-INF"]
    },
    
    compress: {
        meta_removed: {
            options: {
                archive: 'apk/build/meta_removed.zip',
                mode: 'zip'
            },
            files: [
                {expand: true, cwd: 'apk/build/apk_unzipped', src: '**' }
            ]
        }
    }

  });

  // Default task(s).
  grunt.registerTask("default", function(){
    
    grunt.task.run("apk_info");
    grunt.task.run("apk_copy");
    grunt.task.run("apk_rename_to_zip");
    grunt.task.run("apk_unzip");
    grunt.task.run("apk_delete_meta");
    grunt.task.run("apk_compress");
    grunt.task.run("apk_compress_rename");
    grunt.task.run("apk_sign");
    grunt.task.run("apk_signed_info");
    grunt.task.run("apk_zip_align");
    
  });
  
  // keytool -list -printcert -jarfile app-debug.apk
  grunt.registerTask("apk_info", function(){

    var message = chalk.yellow.bold.underline("Displaying Current APK Information.");
    grunt.log.writeln(message);

    grunt.task.run("exec:apk_origunal_info");
    
  });
  
  grunt.registerTask("apk_copy", function(){

    var message = chalk.yellow.bold.underline("Copying Current APK.\nThe Origunal APK can be found as apk/backup");
    grunt.log.writeln(message);

    grunt.task.run("copy:apk");
    
  });

  grunt.registerTask("apk_rename_to_zip", function(){

    var message = chalk.yellow.bold.underline("Renameing Current APK To ZIP");
    grunt.log.writeln(message);

    grunt.task.run("rename:apk");
    
  });

  grunt.registerTask("apk_unzip", function(){

    var message = chalk.yellow.bold.underline("Unzipping Compressed File.");
    grunt.log.writeln(message);

    grunt.task.run("unzip");
    
  });
  
  grunt.registerTask("apk_delete_meta", function(){

    var message = chalk.yellow.bold.underline("Removing Signing/META-INF.");
    grunt.log.writeln(message);

    grunt.task.run("clean:meta_inf");
    
  });
  
  grunt.registerTask("apk_compress", function(){

    var message = chalk.yellow.bold.underline("Compressing Unsigned APK Into ZIP.");
    grunt.log.writeln(message);

    grunt.task.run("compress:meta_removed");
    
  });
  
  grunt.registerTask("apk_compress_rename", function(){

    var message = chalk.yellow.bold.underline("Renaming Compressed ZIP TO APK.");
    grunt.log.writeln(message);

    grunt.task.run("rename:meta_removed");
    
  });

  grunt.registerTask("apk_sign", function(){

    var message = chalk.yellow.bold.underline("Signing APK With Keystore File.");
    grunt.log.writeln(message);

    grunt.task.run("exec:apk_sign");
    
  });

  grunt.registerTask("apk_signed_info", function(){

    var message = chalk.yellow.bold.underline("Displaying Newly Signed APK Information.");
    grunt.log.writeln(message);

    grunt.task.run("exec:apk_new_signed_info");

  });
  
  grunt.registerTask("apk_zip_align", function(){

    var message = chalk.yellow.bold.underline("Running ZipAlign On Newly Signed APK.");
    grunt.log.writeln(message);

    grunt.task.run("exec:zip_align");

  });
  
  grunt.loadNpmTasks("grunt-rename");
  grunt.loadNpmTasks("grunt-exec");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks('grunt-zip');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');

};