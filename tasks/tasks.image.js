var chalk = require("chalk");

module.exports = function(grunt){

    // task for displaying the name of the system
    grunt.registerTask("ascii", function(){

        var message = "\n███╗   ███╗ ██████╗ ██████╗ ██████╗ ██╗  ██╗████████╗██╗  ██╗██╗███████╗\n";
        message += "████╗ ████║██╔═══██╗██╔══██╗██╔══██╗██║  ██║╚══██╔══╝██║  ██║██║██╔════╝\n";
        message += "██╔████╔██║██║   ██║██████╔╝██████╔╝███████║   ██║   ███████║██║███████╗\n";
        message += "██║╚██╔╝██║██║   ██║██╔══██╗██╔═══╝ ██╔══██║   ██║   ██╔══██║██║╚════██║\n";
        message += "██║ ╚═╝ ██║╚██████╔╝██║  ██║██║     ██║  ██║   ██║   ██║  ██║██║███████║\n";
        message += "╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚══════╝\n";
        message += "                                                              - SierraII\n";
        
        var show = chalk.green.bold(message);

        grunt.log.writeln(show);

    });

    // display an image to the user
    grunt.registerTask("display_image", function(){

        var done = this.async();
        var pictureTube = require("picture-tube");
        var tube = pictureTube();
        var fs = require("fs");

        tube.pipe(process.stdout);
        fs.createReadStream("config/logo.png").pipe(tube);
        
        done(grunt.task.run("post_process"));

    });

};