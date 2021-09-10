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

    app.post(`${baseURL}`, async (req, res) => {
        try {
            const result = await baseValidateAndControllerCall('create', params);
            res.status(201).send(result);
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
            const { token } = await baseValidateAndControllerCall('auth', params);
            res.setHeader('X-Authorization', token);
            res.status(201).send();
        } catch (e) {
            console.log(e);
            res.status(400).send(new ValidateException(400,
                'Erro ao processar solicitação!', req.url, e.errors));
        }
    });

    app.put(`${baseURL}/`, verifyToken, async (req, res) => {

        const params = req.body;
        const { userPatientId } = req.params;

        params.userPatientId = userPatientId;

        try {
            const result = await baseValidateAndControllerCall('update', params);
            res.status(204).send(result);
        } catch (e) {
            console.log(e);
            res.status(400).send(new ValidateException(400,
                'Erro ao processar solicitação!', req.url, e.errors));
        }
    });

    app.put(`${baseURL}/reset_password`, async (req, res) => {
        const { email } = req.body
        const params = { email }

        try {
            const result = await baseValidateAndControllerCall('resetPassword', params);
            res.status(204).send(result);
        } catch (e) {
            console.log(e);
            res.status(400).send(new ValidateException(400,
                'Erro ao processar solicitação!', req.url, e.errors));
        }
    })

    app.put(`${baseURL}/update_password`, async (req, res) => {
        const { token, password } = req.body
        const params = { token, password }

        try {
            const result = await baseValidateAndControllerCall('updatePassword', params);
            res.status(200).send(result);
        } catch (e) {
            console.log(e);
            res.status(400).send(new ValidateException(400,
                'Erro ao processar solicitação!', req.url, e.errors));
        }
    })

    app.put(`${baseURL}/active_register`, async (req, res) => {
        const { confirmationToken } = req.body

        const params = { confirmationToken }

        try {
            const result = await baseValidateAndControllerCall('activeRegister', params);
            res.status(204).send(result);
        } catch (e) {
            console.log(e);
            res.status(400).send(new ValidateException(400,
                'Erro ao processar solicitação!', req.url, e.errors));
        }
    })

    app.put(`${baseURL}/send_activation_token`, async (req, res) => {
        const { email } = req.body;
        const { maintainer } = req.params;

        const params = { email, maintainer }

        try {
            const result = await baseValidateAndControllerCall('sendActivationToken', params);
            res.status(204).send(result);
        } catch (e) {
            console.log(e);
            res.status(400).send(new ValidateException(400,
                'Erro ao processar solicitação!', req.url, e.errors));
        }
    })

    app.put(`${baseURL}/solicitation_inactive_account`,verifyToken, async (req, res) => {
        const { password, justify } = req.body;
        const { userPatientId, maintainer } = req.params;

        const params = { password, justify, userPatientId, maintainer };

        try {
            const result = await baseValidateAndControllerCall('solicitationInactiveAccount', params);
            res.status(204).send(result);
        } catch (e) {
            console.log(e);
            res.status(400).send(new ValidateException(400,
                'Erro ao processar solicitação!', req.url, e.errors));
        }
    });

    app.put(`${baseURL}/inactive_account`, async (req, res) => {
        const { inactiveToken } = req.body

        const params = { inactiveToken };

        try {
            const result = await baseValidateAndControllerCall('inactiveAccount', params);
            res.status(204).send(result);
        } catch (e) {
            console.log(e);
            res.status(400).send(new ValidateException(400,
                'Erro ao processar solicitação!', req.url, e.errors));
        }
    });

    app.put(`${baseURL}/alter_password`, verifyToken, async (req, res) => {
        const { actualPassword, newPassword } = req.body;
        const { userPatientId } = req.params;

        const params = { actualPassword, newPassword, userPatientId }

        try {
            const result = await baseValidateAndControllerCall('alterPassword', params);
            res.status(204).send(result);
        } catch (e) {
            console.log(e);
            res.status(400).send(new ValidateException(400,
                'Erro ao processar solicitação!', req.url, e.errors));
        }
    })
};
