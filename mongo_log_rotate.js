/***********************
Filename : mongo_log_rotate.js
Author   : Milton Coleman
Copyright: (c) 2012 Milton Coleman
License  : The Beer Ware License (Revision 44a)
    Milton Coleman wrote this file. As long as you retain this notice you can do whatever you want
    with this stuff, However if we meet some day,  you have buy me a beer in return. Or you can use the GPL v3 license.

Use this file by placing all the servers that you wish to rotate the logs in the server array.
Then run the javascript file from your local mongo that has access to the target servers

    mongo mongo_log_rotate.js
 
Notice that the mongo command
   use admin
   db.runCommand( { logRotate : 1 } )
 
Is the same as
   db.adminCommand({ 'logRotate' : '1' })
*********************/


var server_array = ["server1","server2"];
var array_length = server_array.length;
for (var i = 0; i < array_length; i++) {
    var server = server_array[i];
    var conn = new Mongo(server) ;
    db = conn.getDB("admin");
    db.adminCommand({ 'logRotate' : '1' });
}
