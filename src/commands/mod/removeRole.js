const { MessageEmbed } = require("discord.js")

module.exports = {
    config: {
        name: "removerole",
        aliases: ["rr", "roleremove", "ㄱㄱ", "ㄱ드ㅐㅍㄷ개ㅣㄷ", "역할삭제"],
        description: "특정유저에게 역할삭제",
        usage: "removerole <@username> <role> <reason>",
        accessableby: "Administrators",
    },
    run: async (bot, message, args) => {
        if(!message.member.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("당신이 해야될일은 냥이지한테가서 매니저권한을 달라하세요 그러면 됩니다.")

        let rMember = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.tag == args[0]) || message.guild.members.cache.get(args[0])
        if(!rMember) return message.channel.send("유저태그")
        let role = message.guild.roles.cache.find(r => r.name == args[1]) || message.guild.roles.cache.find(r => r.id == args[1]) || message.mentions.roles.first()
        if(!role) return message.channel.send("역할이름 ") 
        let reason = args.slice(2).join(" ")
        if(!reason) reason = "No reason given"

        if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("봇 권한이 부족합니다")

        await rMember.roles.remove(role).catch(e => {
            console.log(e.message)
            return message.channel.send(`${rMember.displayName}, 역할 이름없음`)
        })

        let embed = new MessageEmbed()
        .setColor(bot.colours.redlight)
        .setAuthor(`${message.guild.name} 로그`, message.guild.iconURL)
        .addField("모드:", "역할")
        .addField("이름:", rMember.user.username)
        .addField("담당관리자:", message.author.username)
        .addField("이유:", reason)
        .addField("날짜:", message.createdAt.toLocaleString())

        try {
            let sChannel = message.guild.channels.cache.find(c => c.name == bot.warningCh)
            sChannel.send(embed)
        } catch (error) {
            console.log(bot.warningCh+"채널이 없어서 메세지를 못 보냅니다.");
            message.channel.send(embed)
        }
    }   
}