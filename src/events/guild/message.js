
const moment = require('moment-timezone');
const forbiddenWord = require('../../util/forbiddenWord.json');

function checkContinuousChatting(bot, message) {
  

    let sponsor = '800728464163602462'; 
    let best_Talker = '800728464163602462'; 
    let apology_channel_msg = '에옹'; 
    let onmute_leave_channel_msg = '냥냥이는 즐거워'; // 

    let member = message.guild.members.cache.find(x => x.user.id == message.author.id );
    let isSponsor = member._roles.find(x => x == sponsor);
    let isBest_Talker = member._roles.find(x => x == best_Talker);

    
    if(isSponsor && isBest_Talker) return;

    
    if(message.member.hasPermission('ADMINISTRATOR')) return;

    
    let messageTime = moment().tz('Asia/Seoul').locale('ko').valueOf()
    let time = bot.authors.get(message.author.id);
    let forbiddenWordTime = bot.authors.get(message.author.id) || messageTime;
    let muterole = message.channel.guild.roles.cache.find(r => r.name == "UMJUNSIK")

   
    let msgs = [
        message.content.replace('\n', ''),
        message.content.replace('\n', '').replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, ''),
        message.content.replace('\n', '').replace(/[^a-z|A-Z]/g, ''),
    ]
    for(fw of forbiddenWord) {
        if(msgs[0].indexOf(bot.prefix+fw) != -1) { 
            continue;
        }
        for(msg of msgs) {
            if(msg.indexOf(fw) != -1) {
                message.guild.members.cache.find(x => x.id == message.author.id).roles.add(muterole.id)
                if(messageTime == forbiddenWordTime) {
                    message.reply(`오 이런 당신의 문장이나 단어에 금지된단어가 감지됬어요\n\`\`금지어: ${fw}\`\`   \`\`당신의 핑 와 샌즈ms\`\`\n\n${apology_channel_msg}${onmute_leave_channel_msg}`);
                } else {
                    message.reply(`오 이런 당신의 문장이나 단어에 금지된단어가 감지됬어요\n\`\`금지어: ${fw}\`\`   \`\`당신의 핑 와샌즈ms\`\`\n${apology_channel_msg}${onmute_leave_channel_msg}`);
                }
                bot.authors.set(message.author.id, messageTime);
                return true;
            }
        }
    }

    // 도배성 채팅 체크
    if(message.content == 'ㅈㄷ레뱆더레ㅐㅓㅂㅈ데래ㅓㅂㅈㄷ레ㅐㅓㅂㅈㄷ래ㅑㅗㅈㄱ햐ㅐㄷㄱ ㅐㄷㄹㄷ래ㅓㄷㅈ레ㅐㅓㅈㄷ레ㅐㅓ' || message.content == 'ㅂㅈㄷ래ㅓㅂㅈㄷ레ㅐㅓㅂㅈㄷㄼ재더레ㅐㅓㅈㄷㄹ[ㅂㅈㄷ레ㅐㅂㅈㄷ레ㅐㅑㅂ졷레ㅐㅑ봊ㄷ레ㅐㅑㅗㅈㄷ레ㅐㅑㅗㄷ랴ㅐ도래ㅑㅗㅈ래ㅑㅗㅈㄷ래ㅑㅗㅂ제래ㅗㅂㅈㄷ레ㅐㅑㅗ') {
        message.guild.members.cache.find(x => x.id == message.author.id).roles.add(muterole.id)
        message.reply(`\`\`너무 \`\` \`\`도배를\`\` 하지마세요\n\n${apology_channel_msg}\n${onmute_leave_channel_msg}`);
        bot.authors.set(message.author.id, messageTime);
        return true;
    } else if(!time) {
        bot.authors.set(message.author.id, messageTime);
        return false;
    } else if(messageTime - time <= 1) {
        message.guild.members.cache.find(x => x.id == message.author.id).roles.add(muterole.id)
        message.reply(`오류났습니다 \n \`\`봇의핑 ${messageTime - time}ms\`\`\n\n${apology_channel_msg}\n${onmute_leave_channel_msg}`);
        bot.authors.set(message.author.id, messageTime);
        return true;
    }

    bot.authors.set(message.author.id, messageTime);
    return false;
}

const adminUserId = 417998410495557632;

module.exports = async (bot, message) => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") {
        

        let msg = `${message.author}이(가) 메세지를 보냈습니다.\n${message.content}`;
        bot.users.cache.find(x => x.id == adminUserId).send(msg)

        return;
    }
    if(checkContinuousChatting(bot, message)) return;

    let args = message.content.slice(bot.prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    if (!message.content.startsWith(bot.prefix)) return;
    let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd))
    if (commandfile) {
        commandfile.run(bot, message, args)
    }
}