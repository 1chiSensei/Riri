const { MongoClient } = require('mongodb');
const { Intents } = require('discord.js');
const Provider = require('commando-provider-mongo');
const Client = require('./Structures/Client');
const config = require('../config');
const path = require('path');

const client = new Client({
        commandPrefix: config.bot.prefix,
        owner: config.bot.owner,
        disableMentions: 'everyone',
        ws: { intents: Intents.ALL },
});

client.registry
        .registerDefaultGroups()
        .registerDefaultTypes()
        .registerDefaultCommands({
                unknownCommand: false,
                ping: false,
                help: false,
        })
        .registerGroups([['util', 'Utility']])
        .registerCommandsIn(path.join(__dirname, 'Commands'));

client.once('ready', async () => {
        client.logger.info('The client is now ready!');

        await client.timers.fetchAll();
});

client.on('debug', (info) => client.logger.info(info));

client.on('error', (err) => client.logger.error(err.stack));

client.on('warn', (info) => client.logger.warn(info));

client.setProvider(
        MongoClient.connect(config.mongodb, { useUnifiedTopology: true }).then(
                (pr) => new Provider(pr, 'riri')
        )
).catch((e) => client.logger.error(e));

client.login(config.bot.token).then(() =>
        client.logger.info('The bot has logged in!')
);
