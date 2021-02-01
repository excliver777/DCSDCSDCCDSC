const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags")

module.exports = {
    config: {
        name: "help",
        aliases: ["ㅐㅑㅙㅑㅙㅑㅈ돌잳랮ㄷ랩ㅈ데로ㅑㅂㅈ레대ㅑㅗㅂㅈㄷ래ㅔㅑㅗㅈㄷ레ㅐ뱢ㄷ레ㅐㅑㅈㅂ대ㅔㄹ댜로ㅑ뱆ㄹㄷ처ㅠㅂ퓾ㅇ파ㅓ췅ㅊㅈㅂ아ㅜㅊㅈㅇㅂㅈㅇ츕ㅈㅇ챠ㅕㅐㅈ오츄ㅑㅕㅐㅈㄷ춏ㅇㅈ뷰챠ㅐㅐㅐㅗㅠ여ㅑ츄ㅗ뱢이ㅗ츄ㅑ뎌ㅗㅠㅂ쟈ㅐ유ㅙㅑㅕㅗ듀ㅐㅑㅕ조야ㅐㅇㅅㄷ죠앳ㅎ뇨ㅕㅐㅂ햊돓ㅈ대ㅕㅛㅀ어놀ㅈㄷ로잳려죧레햐ㅓ고헤ㅑ혀볻ㅈㄹㄷㅈ8972319847123948127349812734918273491827349182734918273491872349182347987"],
        usage: "h",
        description: "Displays all commands that the bot has.",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        const helpImg = '';
        const embed = new MessageEmbed()
            .setAuthor('', helpImg)
            .setColor('#186de6')
            .setFooter(``)

        if (!args[0]) {
            let own_desc = '';
            let normal_desc = '';
            bot.commands.filter(x => x.config.name != 'help').array().forEach(x => {
                if (x.config.accessableby == "Members") {
                    normal_desc += `• \`\`${helpTitle(`${bot.prefix + x.config.aliases[0]}`)}\`\` : **${x.config.description}**\n`;
                } else {
                    own_desc += `• \`\`${helpTitle(`${bot.prefix + x.config.aliases[0]}`)}\`\` : **${x.config.description}**\n`;
                }
            });

            if (message.author.id == '250693463065100298') {
                embed.addField(`Owner Categories :`, own_desc);
            }
            embed.addField(`Categories :`, normal_desc);

            return message.channel.send(embed)
        } 
    }
}
