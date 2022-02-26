const AuthService = require('../services/AuthService');
const BaseResponse = require('../response/BaseResponse');
const Logger = require('../helpers/Logger');

const login = async (req, res) => {
    try {
        const result = await AuthService.login(req.body);
        
        Logger.info(result);
        res.send(BaseResponse.successResponse(result));
    } catch (err) {
        Logger.error(err);
        res.status(err.errorCode || 500).send(BaseResponse.errorResponse(err));
    }
};

module.exports = {
    login: login
};