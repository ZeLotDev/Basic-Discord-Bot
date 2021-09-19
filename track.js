client.player.on("trackStart", (message, track) => message.channel.send(`Bắt đầu chơi ${track.title}...`))
client.player.on("trackAdd", (message, queue, track) => message.channel.send(`Đã thêm \`${track.title}\` vào danh sách chờ`));
client.player.on('playlistAdd', (meessage, queue, playlist) => message.channel.send(`Đã thêm \`${playlist.tracks.length}\` bài hát vào danh sách chờ!`));

client.command = new Collection();
client.aliases = new Collection();
client.categories = readdirSync("./commands/")

["command"].forEach(handler => {
    require(`./handler/${handler}`)(client);
});

client.on("message", async (message) => {
    if (message.author.bot) return;
    const prefix = ','
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length === 0) return;
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) {
        if (command.category === 'music' && !message.member.voice.channel) return message.channel.send('Vui lòng vào room nghe nhạc địt mẹ mày!');
        command.run(client, message, args);
    }
})

client.login(settings.token);