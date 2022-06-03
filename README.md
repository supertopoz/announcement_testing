# Sendbird Announcement to POST message server

This server takes an Announcement body request as a POST request and parses the Announcements into individual POST messages. This server is meant to be used as a way to see how Announcements look without any delay.


## Installation

This server requires [Node.js](https://nodejs.org/) v10+ to run.

create a .env file and add it to the projects root directory. 
Add two environment variables.
 
```sh
APP_ID="YOUR_SENDBIRD_APP_ID"
API_TOKEN="YOUR_SENDBIRD_API_TOKEN"
```

Install the dependencies and devDependencies and start the server.

```sh
cd announcement_servier
npm intall
npm run start:dev
```

POST
```http
localhost:3000/announcements
```


For production environments...

```sh
npm run start
```

## Example request body


```json
{
    "target_list": [
        "sendbird_new_user_throttle_test_9860",
        "sendbird_new_user_throttle_test_9861",
        "sendbird_new_user_throttle_test_9862",
        "sendbird_new_user_throttle_test_9863"
    ],
    "create_channel_options": {
        "data": "SOME_SERIALIZED_JSON",
        "custom_type": "SOME_CHANNEL_CUSTOM_TYPE",
        "distinct": true
    },
    "target_at": "target_users_only_channels",
    "enable_push": false,
    "unique_id": "1afafe73-1104-4f57-a2e1-bf321422f258",
    "announcement_group": "1649846410",
    "message": {
        "message_retention_hour": 730,
        "data": "SOME_SERIALIZED_JSON",
        "user_id": "MESSAGE_SENDER_USER_ID",
        "custom_type": SOME_MESSAGE_CUSTOM_TYPE",
        "type": "MESG",
        "content": "THIS_WILL_BE_THE_MESSAGE_TEXT"
    },
    "create_channel": true
}
```
