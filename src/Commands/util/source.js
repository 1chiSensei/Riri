const Command = require('../../Structures/Command');

module.exports = class extends Command {
        constructor(client) {
                super(client, {
                        name: 'source',
                        aliases: ['src'],
                        group: 'util',
                        memberName: 'source',
                        description: 'Shows the source code of a command.',
                        source:
                                'https://github.com/1chiSensei/Riri/blob/main/src/Commands/util/source.js',
                        args: [
                                {
                                        key: 'command',
                                        prompt:
                                                'Which command do you want to get the source code of?',
                                        type: 'command',
                                },
                        ],
                });
        }

        run(msg, { command }) {
                return msg.embed({
                        description: `**${command.source}**`,
                        color: 'BLUE',
                });
        }
};
