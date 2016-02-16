var chalk = require("chalk");
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    
    rename: {
        apk: {
            src: "apk/app.apk",
            dest: "apk/build/apk_zipped.zip"
        },
    },
    exec: {
        apk_origunal_info: "keytool -list -printcert -jarfile apk/app.apk"
    },

    copy: {
      apk: {
        files: [
          {expand: true, src: ["apk/app.apk"], dest: "apk/backup", filter: "isFile"},
        ],
      },
    },
    
    
    
  });

  // Default task(s).
  grunt.registerTask("default", function(){
    grunt.log.ok("working!");
  });
  
  // keytool -list -printcert -jarfile app-debug.apk
  grunt.registerTask("apk_info", function(){

    var message = chalk.yellow.bold.underline("Displaying Current APK Information.");
    grunt.log.writeln(message);

    grunt.task.run("exec:apk_origunal_info");
    
  });
  
  grunt.registerTask("apk_zip", function(){

    var message = chalk.yellow.bold.underline("Zipping Current APK.");
    grunt.log.writeln(message);

    grunt.task.run("rename:apk");
    
  });
  
  grunt.registerTask("apk_copy", function(){

    var message = chalk.yellow.bold.underline("Copying Current APK.\nThe Origunal APK can be found as apk/backup");
    grunt.log.writeln(message);

    grunt.task.run("copy:apk");
    
  });
  
  grunt.loadNpmTasks("grunt-rename");
  grunt.loadNpmTasks("grunt-exec");
  grunt.loadNpmTasks('grunt-contrib-copy');

};