const { DiscordAPIError } = require("discord.js");

module.exports = {
    config: {
        name: "random",
        aliases: ["골라"],
        description: "랜덤 대답",
        usage: "골라 부먹 찍먹",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        let min = 0;
        let max = args.length;
        let index = parseInt(Math.random() * (max - min) + min);
 message.channel.send(`저의선택은 ${args[index]} 이에요!`)
    }
}