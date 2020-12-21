const Gamecord = require('gamecord').djs;
const Command = require('../../Structures/Command');

module.exports = class extends Command {
        constructor(client) {
                super(client, {
                        name: 'connect4',
                        aliases: ['connectfour'],
                        group: 'game',
                        memberName: 'connect4',
                        source:
                                'https://github.com/1chiSensei/Riri/blob/main/src/Commands/game/connect4.js',
                        description: 'Play connect4 game!',
                        clientPermissions: ['MANAGE_MESSAGES'],
                });
        }

        run(msg) {
                return new Gamecord.ConnectFour(msg, {
                        title: 'Connect4',
                        color: 'BLUE',
                        timestamp: Date.now(),
                }).run();
        }
};
