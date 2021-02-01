const cheerio = require("cheerio")
const request = require("request")

let url = "http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=11&ncvContSeq=&contSeq=&board_id=&gubun=" //코로나바이러스감염증-19(COVID-19)
let aa = -1;
var covid_notice_channel;

module.exports = {
    config: {
        name: "covid",
        aliases: ["코로나", "zhfhsk"],
        description: "대한민국 코로나 상태",
        usage: "코로나",
        accessableby: "Members"
    },
    core: async (bot) => {
        return new Promise((resolve, reject) => {
            request(url, (error, response, body) => {
                // const $ = cheerio.load(body)
                let info = '', text1 = '', text2 = '', text3 = '';

                let oversea = response.body.split('DP_data.oversea.push').slice(1, 8).map(x => x.split('("')[1].split('")')[0]); // 해외 유입
                let region = response.body.split('DP_data.region.push').slice(1, 8).map(x => x.split('("')[1].split('")')[0]); // 국내 발생
                let date = response.body.split('DP_data.date.push').slice(1, 8).map(x => x.split('("')[1].split('")')[0]); // 날짜
                let covidList = `\`\`\`md\n`;
                covidList += `코로나바이러스감염증-19 (SARS-CoV-2)\n`;
                covidList += `자료는 https://corona-live.com/ 를 사용했습니다\n`;
                covidList += `(DATE){신규감염자} [해외에서 온 감염자, 국내 확진자.]\n`;
                covidList += date.map((x, i) => {
                    if (i + 1 == date.length) {
                        info = "총 감염된사람 : \`\`" + '(' + x + '. 00시 기준)' + "\`\`";
                        text1 = "새로운 감염자 : \`\`+ " + (parseInt(oversea[i]) + parseInt(region[i])) + "\`\`";
                        text2 = "외국 확진자 : \`\`" + oversea[i] + "\`\`";
                        text3 = "한국확진자 : \`\`" + region[i] + "\`\`";
                    }
                    return `[2020.${x}][${parseInt(oversea[i]) + parseInt(region[i])}] <${oversea[i]} ${region[i]}>`;
                }).join('\n')
                covidList += `\`\`\``;

                resolve(`${info}\n\n${text1}\n${text2}\n${text3}\n\n${covidList}`);
            })
        });
    },
    crun: async (bot) => {
        if (aa == -1) {
            bot.guilds.cache.forEach(x => {
                if (x.name == 'hello world') { 
                    x.channels.cache.forEach(y => {
                        if (y.name == '테스트') {
                            aa = y.id;
                        }
                    })
                }
            });
            covid_notice_channel = bot.channels.cache.find(x => x.id == aa);
        }

        covid_notice_channel.send(await module.exports.core(bot));
    },
    run: async (bot, message, args) => {
        message.channel.send(await module.exports.core(bot))
    }
}