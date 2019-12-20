const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TOKEN;
const bot = new TelegramBot(token, {
    polling: true
});

const onlyS = require('./onlystream.js')

const StartKeyboard = [
    ['/RemoteUpload'],
    ['/FileInfo']
]

// YOUR CODE STARTS HERE

bot.onText(/\/start/, (msg) => {
    const opts = {
        reply_to_message_id: msg.message_id,
        reply_markup: JSON.stringify({
            keyboard: StartKeyboard,
            resize_keyboard: true
        })
    };
    bot.sendMessage(msg.chat.id, `Hi, How are u?`, opts);
});

bot.onText(/\/RemoteUpload/, async (msg) => {
    const opts = {
        reply_to_message_id: msg.message_id
    };
    bot.sendMessage(msg.chat.id, `Direct Url?:`, opts);
    bot.once('message', async (msg) => {
        var raw = msg.text;
        var res = raw.split(" ");
        bot.sendMessage(msg.chat.id, 'Thanks, your request has been received', {
            reply_to_message_id: msg.message_id
        });
        var dirUrl = res[1]
        const send = await onlyS.RemoteUpload(dirUrl);
        if(send.status === 400) {
            const mes = `Anjir error :(\nServer time: ${send.server_time}\nError: ${send.msg}`
            bot.sendMessage(msg.chat.id, mes);
        } else if (send.msg === 'OK') {
            bot.sendMessage(msg.chat.id, `Done Sir,\nStatus: ${send.status}\nServer_time: ${send.server_time}\nFile Code: ${send.result.filecode}\nLink: https://onlystream.tv/${send.result.filecode}`);
        } else {
            const mes = `Anjir error :(`
            bot.sendMessage(msg.chat.id, mes);
        }
    });
});

bot.onText(/\/FileInfo/, async (msg) => {
    const opts = {
        reply_to_message_id: msg.message_id
    };
    bot.sendMessage(msg.chat.id, `File Code?:`, opts);
    bot.once('message', async (msg) => {
        var raw = msg.text;
        var res = raw.split(" ");
        bot.sendMessage(msg.chat.id, 'Thanks, your request has been received', {
            reply_to_message_id: msg.message_id
        });
        var dirUrl = res[1]
        const send = await onlyS.FileInfo(dirUrl);
        if(send.status === 400) {
            const mes = `Anjir error :(\nServer time: ${send.server_time}\nError: ${send.msg}`
            bot.sendMessage(msg.chat.id, mes);
        } else if (send.msg === 'OK') {
            const len = send.result[0].length/60
            bot.sendMessage(msg.chat.id, `File Name: ${send.result[0].name}\nLength: ${len.substring(0,5)}Minute\nCan Play:  ${send.result[0].canplay}\nViews:  ${send.result[0].views}\nThumbnail: ${send.result[0].thumbnail}\nLink: https://onlystream.tv/${send.result.filecode}`);
        } else {
            const mes = `Anjir error :(`
            bot.sendMessage(msg.chat.id, mes);
        }
    });
});

process.on('uncaughtException', function (error) {
    console.log("\x1b[31m", "Exception: ", error, "\x1b[0m");
});

process.on('unhandledRejection', function (error) {
    console.log("\x1b[31m", "Rejection: ", error.message, "\x1b[0m");
});