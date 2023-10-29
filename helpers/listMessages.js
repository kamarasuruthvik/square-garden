/**
 * Lists the messages from swelist in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
const { google } = require('googleapis');
async function getDecodedMessage(auth) {
    const gmail = google.gmail({ version: 'v1', auth });
    const res = await gmail.users.messages.list({
        userId: 'me',
        maxResults: 1,
        q: "from:noreply@swelist.com"
    });
    const messageList = res.data;
    if (!messageList || messageList.length === 0) {
        console.log('No messages found.');
        return;
    }

    const messageId = messageList.messages[0].id;

    const messageResponse = await gmail.users.messages.get({
        userId: 'me',
        id: messageId
    });
    undecodedEmailData = messageResponse?.data.payload.body.data;
    return undecodedEmailData;
}

module.exports = { getDecodedMessage };