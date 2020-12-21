const Redis = require('ioredis');
const config = require('../../config');
const redis = new Redis({
        port: config.redis.port,
        host: config.redis.host,
        password: config.redis.password,
        enableReadyCheck: true,
});

class RedisClient {
        static get db() {
                return redis;
        }

        static start() {
                redis.on('connect', () =>
                        console.info('[REDIS][CONNECT]: Connecting...')
                );
                redis.on('ready', () => console.info('[REDIS][READY]: Ready!'));
                redis.on('error', (error) =>
                        console.error(
                                `[REDIS][ERROR]: Encountered error:\n${error}`
                        )
                );
                redis.on('reconnecting', () =>
                        console.warn('[REDIS][RECONNECT]: Reconnecting...')
                );
        }
}

module.exports = RedisClient;
