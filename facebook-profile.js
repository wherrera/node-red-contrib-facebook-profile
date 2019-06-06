const {FB, FacebookApiException} = require('fb');

module.exports = function(RED) {
    function FacebookProfileNode(config) {
        RED.nodes.createNode(this,config);
        this.fb_appid = config.fb_appid;
        this.fb_appsecret = config.fb_appsecret;
        this.fb_fields = config.fb_fields;
        var node = this;
        node.on('input', async function(msg) {

            FB.options({
                    version: 'v2.4',
                    appId: node.fb_appid,
                    appSecret: node.fb_appsecret
                });

            let access_token = msg.payload.fb_access_token;
        
            if(!access_token) {
                msg.payload = {
                    "error" : "invalid access token"
                };
                node.send(msg);
                return;
            }

            try {
                FB.api('me', { fields: node.fb_fields, access_token: access_token }, function (fb_res) {
                    if(fb_res && fb_res.error)
                    {
                        msg.payload = {
                            "error" : fb_res.error
                        };
                    }
                    else {
                        msg.payload = fb_res;
                    }
                    node.send(msg);
                });
            }
            catch (e) {
                msg.payload = {"error": e};
                node.send(msg);
            }
        });
    }
    RED.nodes.registerType("facebook-profile",FacebookProfileNode);
}