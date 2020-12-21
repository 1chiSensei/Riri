const config = require('../../config');
const bodyParser = require('body-parser');
const morganBody = require('morgan-body');
const helmet = require('helmet');
const Monitor = require('ping-monitor');
const express = require('express');
const monitor = new Monitor({
        website: config.web.address,
        title: 'Website',
        interval: 3,
});
const fetch = require('node-fetch');
const path = require('path');
const app = express();

module.exports = (port, client) => {
        app.set('views', path.join(__dirname, 'views'));
        app.set('view engine', 'ejs');
        app.use(helmet());
        app.use(bodyParser.json());
        morganBody(app);

        monitor.on('up', (res) => {
                client.logger.info(`${res.website} is active.`);
        });

        app.get('/', (req, res) => {
                res.status(200).render('pages/index', {
                        users: client.guilds.cache.reduce(
                                (a, b) => a + b.memberCount,
                                0
                        ),
                        channels: client.channels.cache.size,
                        commands: client.registry.commands.size,
                        servers: client.guilds.cache.size,
                });
        });
        app.listen(port);

        setInterval(() => fetch(config.web.address), 180000);
};
