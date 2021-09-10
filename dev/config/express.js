import express from 'express';
import bodyParser from 'body-parser';
import config from 'config';
import consign from 'consign';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../config/swagger.json';

import 'dotenv/config';

module.exports = () => {
    const app = express();

    if (process.env.API_ADDRESS) {
        const [scheme, host] = process.env.API_ADDRESS.split('://');
        swaggerDocument.host = host;
        swaggerDocument.schemes.unshift(scheme);
    }

    // SETANDO VARIÁVEIS DA APLICAÇÃO
    app.set('port', process.env.PORT || config.get('server.port'));

    // MIDDLEWARES
    app.use(bodyParser.json());

    app.use(cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        exposedHeaders: 'X-Authorization',
      }));

    app.use(`${config.get('base_url')}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.get(`${config.get('base_url')}/api-docs`, swaggerUi.setup(swaggerDocument));

    consign({ cwd: `${config.get('env')}/api` })
        .then(`models`)
        .then(`repositories`)
        .then(`validations`)
        .then(`controllers`)
        .then(`resources`)
        .into(app);

    return app;
};
