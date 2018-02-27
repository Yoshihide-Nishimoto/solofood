var https = require('https');
var config = require('../common/Const.json')[process.env.NODE_ENV];

exports.sendNotification = function ( body, badge, isMute ) {
    var sound = "";
    if (!isMute) {
        sound = "default";
    }
    var postData = JSON.stringify({
            "to": "/topics/all",
            "priority" : "high",
            "notification" : {
                        "body" : body,
                        "sound": sound,
                        "badge": badge,
                    }
        });

    var options = {
            hostname: 'fcm.googleapis.com',
            path: '/fcm/send',
            method: 'POST',
            headers: {
                        'Content-Type': 'application/json',
                        "Authorization" : `key={config.apikey}`
                    }
        };

    var req = https.request(options, (res) => {
            console.log("OK");
        });

    req.on('error', (e) => {
            console.error("problem with request: "+ e.message);
        });

    req.write(postData);
    req.end();
}
