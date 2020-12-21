const { Command } = require('discord.js-commando');

module.exports = class RiriCommand extends Command {
        constructor(client, info) {
                super(client, info);

                this.throttling = { usages: 2, duration: 5 };
                this.source =
                        info.source || 'https://github.com/1chiSensei/Riri';
        }
};
