const { MessageEmbed } = require("discord.js")

module.exports = {
    config: {
        name: "addrole",
        aliases: ["ar", "ㅁㄱ", "addrole", "역할추가"],
        description: "유저에게 역할 추가",
        usage: "addrole <@username>",
        accessableby: "Administrators",
    },
    run: async (bot, message, args) => {
        if(!message.member.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("내")

        let rMember = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.tag == args[0]) || message.guild.members.cache.get(args[0])
        if(!rMember) return message.channel.send("맨션좀")
        let role = message.guild.roles.cache.find(r => r.name == args[1]) || message.guild.roles.cache.find(r => r.id == args[1]) || message.mentions.roles.first()
        if(!role) return message.channel.send("역할 이름이요") 
        let reason = args.slice(2).join(" ")
        if(!reason) reason = "이유이유이유이유이유이유이유이유이유"

        if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("권한 ㅇ")

        await rMember.roles.add(role).catch(e => {
            console.log(e.message)
            return message.channel.send(`${rMember.displayName}, 이미있음`)
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
            console.log(bot.warningCh+"몰라 귀차나");
            message.channel.send(embed)
        }
    }
}