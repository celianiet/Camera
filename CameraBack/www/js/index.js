/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

 function pics(){
     navigator.camera.getPicture(cameraCallback, onError);
 }

 function cameraCallback(imageData) {
     //var image = document.getElementById('myImage');
     //image.src = imageData;
     dataObj = new Blob([imageData], { type: 'image/png' });
     writeFile(dataObj);

}

function onError(message){
     console.log(message);
}

//Read and write the image.

var myPicture;
var contentGlobal;
var fileEntryGlobal;
var dataObj;

function tryingFile() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemCallback, onError);   
}

function fileSystemCallback(fs) {

    // Name of the file 
    var fileToCreate = "image.png";

    // Opening/creating the file
    fs.root.getFile(fileToCreate, fileSystemOptionals, getFileCallback, onError);

}

var fileSystemOptionals = { create: true, exclusive: false };

function getFileCallback(fileEntry) {
   //fileEntry 
    fileEntryGlobal = fileEntry;
   
    
}

// Let's write some picture
function writeFile(myPicture) {
        
    //contentGlobal = contentGlobal + myPicture;
    //var dataObj = new Blob([contentGlobal], { type: 'image/png' });

    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntryGlobal.createWriter(function (fileWriter) {

        // If data object is not passed in,
        // create a new Blob instead.
        // if (!dataObj) {
        //     dataObj = new Blob([contentGlobal], { type: 'image/png' });
        // }

        fileWriter.write(dataObj);

        fileWriter.onwriteend = function() {
            console.log("Picture was taken");
            var saveFile = "Data saved";
            document.getElementById("saved").innerHTML=saveFile;
        };

        fileWriter.onerror = function (e) {
            console.log("Failed file write: " + e.toString());
            document.getElementById('saved').innerHTML="Please, try again.";
        };    

    });
        
}

// Let's read some files
function readFile() {

    // Get the file from the file entry
    fileEntryGlobal.file(function (file) {

        // Create the reader
        var reader = new FileReader();
        reader.readAsText(file);

        reader.onloadend = function () {

            console.log("Successful file read: " + this.result);
            console.log("file path: " + fileEntryGlobal.fullPath);
            contentGlobal = this.result;
            var image = document.getElementById('myImage');
            image.src = contentGlobal;

        };

    }, onError);
}

function onError(msg) {
    console.log(msg);
}




 //Now I want to move the picture in a permanent folder and then save the link into my database :

//  function movePic(file){ 
//     window.resolveLocalFileSystemURI(file, resolveOnSuccess, resOnError); 
// } 

//Callback function when the file system uri has been resolved
//function resolveOnSuccess(entry){ 
    //var d = new Date();
    //var n = d.getTime();
    //new file name
    // var newFileName = n + ".jpg";
    // var myFolderApp = "EasyPacking";

    // window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) {      
    //The folder is created if doesn't exist
//     fileSys.root.getDirectory( myFolderApp,
//                     {create:true, exclusive: false},
//                     function(directory) {
//                         entry.moveTo(directory, newFileName,  successMove, resOnError);
//                     },
//                     resOnError);
//                     },
//     resOnError);

// }

//Callback function when the file has been moved successfully - inserting the complete path
//function successMove(entry) {
    //I do my insert with "entry.fullPath" as for the path
//}

// function resOnError(error) {
//     alert(error.code);
// }





