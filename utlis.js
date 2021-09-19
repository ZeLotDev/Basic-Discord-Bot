const checkSameRoom = (message) => {
    if (!message.member.voice.channel) return message.reply('Hãy vô room để nghe nhạc PLS !');
    if (!message.guild.me.voice.channelID || message.guild.me.voice.channelID == message.member.voice.channelID) return;
    return message.reply('Bot có chung phòng đéo đâu mà đòi nghe nhạc!');
}

module.exports = {
    checkSameRoom,
}