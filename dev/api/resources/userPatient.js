import config from 'config';
import ValidateException from '../exceptions/validate';
import verifyToken from '../middlewares/verifyToken';

module.exports = (app) => {
    const controller = app.controllers.userPatient;
    const validations = app.validations.userPatient;

    const baseURL = `${config.get('base_url')}`;

    const baseValidateAndControllerCall = async (serviceName, params) => {
        await validations[serviceName](params);
        return await controller[serviceName](params);
    };

    app.get(`${baseURL}/`, verifyToken, async (req, res) => {
        // Inserir id do associado no middleware de authenticação
        const { userPatientId } = req.params;

        const params = { userPatientId };

        try {
            const result = await baseValidateAndControllerCall('findOne', params);
            res.status(200).send(result);
        } catch (e) {
            console.log(e);
            res.status(400).send(new ValidateException(400,
                'Erro ao processar solicitação!', req.url, e.errors));
        }
    });

    app.post(`${baseURL}/login`, async (req, res) => {
        const { email, password } = req.body

        const params = { email, password };

        try {
            const { token } = await baseValidateAndControllerCall('login', params);
            res.setHeader('X-Authorization', token);
            res.status(201).send();
        } catch (e) {
            console.log(e);
            res.status(400).send(new ValidateException(400,
                'Erro ao processar solicitação!', req.url, e.errors));
        }
    });
};
