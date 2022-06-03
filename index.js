const express = require('express')
const axios = require('axios');
require('dotenv').config();

const app = express()
const port = process.env.PORT || 3000;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const APP_ID = process.env.APP_ID;
const TOKEN = process.env.API_TOKEN;

/*
    The service attempts to create a channel using the is_distinct attribute. 
    If no channel exists then one is created and a channel object is returned. 
    If a channel does exist then one will be returned and a channel object is returned. 
    The channel_url in the returned object is used for sending the message. 
*/

const  createChannel = async (data, targetUserId) => {

        const botUser = data.message.user_id;
 
        var configCreateChannel = {
            method: 'post',
            url: `https://api-${APP_ID}.sendbird.com/v3/group_channels`,
            headers: {
                'Api-Token': TOKEN,
                'Content-Type': 'application/json'
            },
            data: {
                user_ids: [targetUserId, botUser],
                is_distinct: data.create_channel_options.distinct,
                data: data.create_channel_options.data,
                custom_type: data.create_channel_options.custom_type
            }
        };
        const result = await axios(configCreateChannel)
        return result.data? {error: false, data: result.data}: {error:true, message: "channel not created!"}
}


const sendMessage = async(data, channelUrl) => {

        const message = data.message
        message.message = message.content;

        var configCreateChannel = {
            method: 'post',
            url: `https://api-${APP_ID}.sendbird.com/v3/group_channels/${channelUrl}/messages`,
            headers: {
                'Api-Token': TOKEN,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(message)
        };
        const result = await (configCreateChannel);
        return result.data? {error: false, data: result.data}: {error:true, message: "message not sent!"}
}


app.post('/v3/announcements', (req, res) => {

    const targetUsers = req.body.target_list;

    const myCoolFunction = async (arr, i) => {

        const throttleTime = 300 // in milliseconds
        if (i < arr.length) {

            const targetUserId = targetUsers[i];
 
            const channelCreation = await createChannel(req.body, targetUserId)
            if(channelCreation.error) {
                console.log(channelCreation.error)
                return;
            }

            const channelUrl = channelCreation.data.channel.channel_url;
            const messageSend = await sendMessage(req.body, channelUrl);
            if(messageSend.error) {
                console.log(messageSend.error)
                return;
            }
            i++;
            setTimeout(myCoolFunction, throttleTime, arr, i);
        } else {
            res.send("Done")
        }
    };

    myCoolFunction(targetUsers, 0);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})