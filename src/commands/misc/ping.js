module.exports = {
    config: {
        name: "ping",
        aliases: ["핑"],
        description: "핑 상태",
        usage: "핑",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        message.channel.send(`(탁구공이 아주빠르게 날라온다)`).then(m => {
            // m.edit(`🏓 Pong! (💙: ${m.createdTimestamp - message.createdTimestamp}ms. :purple_heart:: ${Math.round(bot.ws.ping)}ms.)`);
            m.edit(`🏓 퐁! ( ${m.createdTimestamp - message.createdTimestamp}ms. 이정도는 쉽지 힛 ~)`);
        });
    }
}