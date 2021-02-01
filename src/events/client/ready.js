module.exports = bot => {
    let activities = [
        `${bot.guilds.cache.size} servers!`,
        `${bot.channels.cache.size} channels!`,
        `${bot.users.cache.size} users!`
    ];

    log(`${redChalk(bot.user.username)} ${greenChalk('is online')}`);
};
