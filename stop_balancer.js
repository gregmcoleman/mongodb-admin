/***********************
Filename : stop_balancer.js
Author   : Milton Coleman
Copyright: (c) 2014 Milton Coleman
License  : The Beer Ware License (Revision 42)
    Milton Coleman wrote this file. As long
    as you retain this notice you can do whatever you want
    with this stuff. If we meet some day, and you think
    this stuff is worth it, you can buy me a beer in return.

Run the javascript file from your local mongos that has access to the shard

    mongo stop_balancer.js
 
*********************/

db = connect("localhost:27017") ;
// stop the balancer
db.getSisterDB( "config" ).settings.update({ _id: "balancer" }, { $set : { stopped: true } }, true );

// now wait for the balancer to finish 
    var x = db.getSisterDB("config").locks.findOne({ _id: "balancer" });
    if (x == null) {
        print("config.locks collection empty or missing. Please connect to a mongos");
        return false;
    }

do {
x = db.getSisterDB("config").locks.findOne({ _id: "balancer" });
    sleep(1000) ;
    print("Shutting down..") ;
} while (x.state > 0 );

