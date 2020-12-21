const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');

module.exports = class extends Command {
        constructor(client) {
                super(client, {
                        name: 'ping',
                        aliases: ['pong', 'latency'],
                        group: 'util',
                        source:
                                'https://github.com/1chiSensei/Riri/blob/main/src/Commands/util/ping.js',
                        memberName: 'ping',
                        description: 'Shows you the latency of the bot.',
                        guarded: true,
                });
        }

        async run(msg) {
                const message = await msg.say('Pinging...');
                const latency = message.createdTimestamp - msg.createdTimestamp;
                const ping = await this.client.db.fetchLatency();
                const embed = new MessageEmbed()
                        .setDescription(
                                `Riri's ping: \`${latency} ms\`\nHeartbeat ping: \`${
                                        this.client.ws.ping
                                } ms\`\nDatabase ping: \`${Math.round(
                                        ping.average
                                )} ms\``
                        )
                        .setTimestamp()
                        .setColor('RANDOM');
                message.edit('Pong! 🏓', embed);
        }
};
