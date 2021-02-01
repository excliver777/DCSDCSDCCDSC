const { BitField } = require("discord.js")

module.exports = {
    config: {
        name: "mute",
        aliases: ["마스크주기"],
        description: "뮤트",
        usage: "m <@username> <reason>",
        accessableby: "Administrators",
    },
    run: async (bot, message, args) => {
      
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply("당신이 해야될일은 냥이지한테가서 매니저권한을 달라하세요 그러면 됩니다.");

    
        let mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!mutee) return message.channel.send("사용자요\n사용법 : " + module.exports.config.usage);

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "No reason given"

      
        let muterole = message.channel.guild.roles.cache.find(r => r.name == "답답한 K-999 마스크")
        if (!muterole) {
            try {
                muterole = await message.guild.roles.create({
                    data: {
                        name: "답답한 K-999 마스크",
                        color: bot.colours.red_dark,
                    },
                    reason: reason,
                })
                muterole.setPermissions(new BitField(0)); 
                message.guild.channels.cache.forEach(async (channel, id) => { 
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        SEND_TTS_MESSAGES: false,
                        ATTACH_FILES: false,
                        SPEAK: false,
                    })
                })
            } catch (e) {
                console.log(e.stack);
            }
        }

        
        mutee.roles.add(muterole.id).then(() => {
            message.channel.send(`${mutee.user} 님은 현재 매니저의의해 마스크를 쓰게됨.`)
        }).catch(e => {
            message.reply(`${mutee.user}를(을) 마스크를씌어야하는데 마스크가 없어요 (오류)`)
        })
    }
}