const { checkSameRoom } = require('../utlis');
const { Util } = require("discord-player");
module.exports = {
    name: 'play',
    aliases: ['p'],
    category: 'music',
    description: 'Chơi nhạc từ gu gồ',
    run: async (client, message, args) => {
        if (checkSameRoom(message)) return;
      if (Util.isURL(args.join(" "))) return client.player.play(message, args.join(" "), { firstResult: true });
      const tracks = await Util.ytSearch(args.join(" "), {
          user: message.author,
          player: client.player
      }).catch(() => {});

      if (!tracks || !tracks.length) return message.channel.send("Track not found!");

      client.player.play(message, tracks[0].url, { firstResult: true });
    }
}