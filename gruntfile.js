/* -------------------------------------------------------------------- */
/*

    morphthis - APK Resigner
    Copyright: Adrian David Smith 2016

*/
/* -------------------------------------------------------------------- */

module.exports = function(grunt){

  /* -------------------------------------------------------------------- */
  /*

      Config Init

  */
  /* -------------------------------------------------------------------- */
  grunt.initConfig({

    // read config files
    pkg: grunt.file.readJSON("package.json"),
    secret: grunt.file.readJSON("secret.json"),

    // rename files 
    rename: {
        apk: {
            src: "<%= secret.apk_path %>",
            dest: "apk/build/apk_zipped.zip"
        },
        meta_removed: {
            src: "apk/build/meta_removed.zip",
            dest: "apk/build/app-unsigned.apk"
        },
    },

    // execute shell commands
    exec: {
        apk_origunal_info: "keytool -list -printcert -jarfile <%= secret.apk_path %>",
        keystore_info: "keytool -list -keystore <%= secret.keystore_path %> -storepass <%= secret.keystore_password %> -alias <%= secret.alias_name %>",
        apk_new_signed_info: "keytool -list -printcert -jarfile apk/build/app-unsigned.apk",
        zip_align: "<%= secret.zip_align_path %> -v 4 apk/build/app-unsigned.apk apk/build/app-signed.apk",
        apk_sign: "jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -storepass <%= secret.keystore_password %> -keystore <%= secret.keystore_path %> apk/build/app-unsigned.apk <%= secret.alias_name %>",
        npm_update: "npm update"
    },

    // copy files
    copy: {
        apk: {
            files: [
              {expand: true, src: ["<%= secret.apk_path %>"], dest: "apk/backup", filter: "isFile"},
            ],
        },
    },

    // unzip files
    unzip: {
        "apk/build/apk_unzipped": "apk/build/apk_zipped.zip"
    },

    // delete files and folders
    clean: {
        meta_inf: ["apk/build/apk_unzipped/META-INF"],
        apk_unzipped_folder: ["apk/build/apk_unzipped/"],
        apk_zipped_file: ["apk/build/apk_zipped.zip"],
        apk_folder: ["apk/"],
        
    },

    // compress or zip files
    compress: {
        meta_removed: {
            options: {
                archive: "apk/build/meta_removed.zip",
                mode: "zip"
            },
            files: [
                {expand: true, cwd: "apk/build/apk_unzipped", src: "**" }
            ]
        }
    },

    // interactive prompt
    prompt: {
        target: {
            options: {
                questions: [
                  {
                      config: "open_prompt.config",
                      type: "list",
                      message: "Select Task To Run",
                      default: "Sign APK",
                      choices: ["Sign APK","Clean Build", "Update Packages", "Configuration", "APK Info", "Keystore Info"]
                  }
                ]
            }
        },
    },

    open: {
        apk:{
            path: "./apk/build/"
        },
        config:{
            path: "secret.json"
        }
    }

  });

  /* -------------------------------------------------------------------- */
  /*

      Load Tasks And NPM Modules

  */
  /* -------------------------------------------------------------------- */
  grunt.loadTasks("tasks");
  require('load-grunt-tasks')(grunt);

};