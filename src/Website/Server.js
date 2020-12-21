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
const app = express();

module.exports = (port, client) => {
	app.set('view engine', 'ejs')
        app.use(helmet());
        app.use(bodyParser.json());
        morganBody(app);

        monitor.on('up', (res) => {
                client.logger.info(`${res.website} is active.`);
        });

        app.get('/', (req, res) => {
                res.status(200).send('hii');
        });
        app.listen(port);

        setInterval(() => fetch(config.web.address), 180000);
};
