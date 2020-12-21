const config = require('../../config');
const { CommandoClient } = require('discord.js-commando');
const TimerManager = require('./Remind/TimerManager');
const Server = require('../Website/Server');
const { Database } = require('quickmongo');
const Redis = require('./Redis');
const winston = require('winston');

class RiriClient extends CommandoClient {
        constructor(options) {
                super(options);

                this.validateConfig(config);

                this.logger = winston.createLogger({
                        transports: [new winston.transports.Console()],
                        format: winston.format.combine(
                                winston.format.timestamp({
                                        format: 'MM/DD/YYYY HH:mm:ss',
                                }),
                                winston.format.printf(
                                        (log) =>
                                                `[${
                                                        log.timestamp
                                                }] [${log.level.toUpperCase()}]: ${
                                                        log.message
                                                }`
                                )
                        ),
                });
                this.db = new Database(config.mongodb);
                this.timers = new TimerManager(this);
                this.server = Server(config.web.port || 3000, this);
                this.config = config;
                this.redis = Redis.db;
        }

        validateConfig(configFile) {
                const { bot, redis, mongodb, web } = configFile;
                if (typeof bot.token !== 'string')
                        throw new Error('Bot token must be a type of string.');
                if (typeof bot.prefix !== 'string')
                        throw new Error('Bot prefix must be a type of string.');
                if (typeof bot.owner !== 'string')
                        throw new Error('Bot owner must be a type of string.');
                if (typeof redis.host !== 'string')
                        throw new Error('Redis host must be a type of string.');
                if (typeof redis.port !== 'number')
                        throw new Error('Redis port must be a type of number.');
                if (typeof redis.password !== 'string')
                        throw new Error(
                                'Redis password must be a type of string'
                        );
                if (typeof web.address !== 'string')
                        throw new Error('Web address must be a type of string');
                if (typeof web.port !== 'number')
                        throw new Error('Web port must be a type of number.');
                if (typeof mongodb !== 'string')
                        throw new Error('MongoDB uri must be a type of string');
                if (typeof bot !== 'object')
                        throw new Error(
                                'Bot options must be a type of object.'
                        );
                if (typeof redis !== 'object')
                        throw new Error(
                                'Redis options must be a type of object.'
                        );
                if (typeof web !== 'object')
                        throw new Error('Web options must be a type of object');
        }
}
module.exports = RiriClient;
