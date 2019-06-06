# node-red-contrib-facebook-profile
Node to access facebook profile using an access_token

## Usage
> Pass the facebook user access token to the node by setting the property `msg.payload.fb_access_token`
```js
msg.payload.fb_access_token = "USER_ACCESS_TOKEN";
```

## The node will set the `msg.payload` to the result
```js
{"id":"FB_ID","name":"USERS_NAME"}
```