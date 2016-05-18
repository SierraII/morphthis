morphthis - Android APK Resigner
======

<p align="center">
    <img src="https://github.com/SierraII/morphthis/blob/master/config/images/grunt.png?raw=true" alt=""/>
    <img src="https://github.com/SierraII/morphthis/blob/master/config/images/nodejs.jpg?raw=true" alt=""/>
    <img src="https://github.com/SierraII/morphthis/blob/master/config/images/android.jpg?raw=true" alt=""/>
</p>

An automated script that can resign Android APK files on the fly, whether that APK file has already been signed or not.  

## Overview:
There is an error with the way Android Studio signs keystore files that were originally .p12 files. During the conversion process, the newly converted keystore file contains the correct SHA1 and MD5 keys. However, during the generation of signed APK files, the fingerprints have been known to change and all other information matches. This script streamlines the signing process and ensures the APK gets signed correctly with the keytool and other processes.  

![alt text](https://github.com/SierraII/morphthis/blob/master/screenshots/prompt.png "Screenshot")
![alt text](https://github.com/SierraII/morphthis/blob/master/screenshots/zip_align.png "Screenshot")
![alt text](https://github.com/SierraII/morphthis/blob/master/screenshots/done.png "Screenshot")
## Installation:
Install [node.js](https://nodejs.org/en/download/)  
  
Open your terminal and cd into the morphthis directory
```
cd your/directory/of/morphthis
```
Install GruntCLI.  
```
npm install -g grunt-cli
```
Open your terminal and cd into the morphthis directory and npm install in the root directory.  
This will install all project dependencies.  
```
npm install
```
The Keystore information and APK path must be kept private. In order to use this script, create a secret.json file this project root tht has the following information:
```json
{
  "zip_align_path":"path/to/zip/align",
  "keystore_password":"password",
  "keystore_path":"path/to/keystore",
  "apk_path":"path/to/apk",
  "apk_name":"your-apk-name.apk",
  "alias_name":""
}
```
An example of your zip align path (where your Android SDK Tools are located) is as follows: /Users/adriandavidsmith/Library/Android/sdk/build-tools/21.1.1/zipalign  

## Usage
Open your terminal and cd into the morphthis directory and type 'grunt' for a list of available commands.
```
grunt
```
