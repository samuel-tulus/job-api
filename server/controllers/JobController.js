const JobService = require('../services/JobService');
const BaseResponse = require('../response/BaseResponse');
const Logger = require('../helpers/Logger');
const GetJobListResponse = require('../response/GetJobListResponse');
const GetJobDetailResponse = require('../response/GetJobDetailResponse');

const getJobList = async (req, res) => {
    try {
        const result = await JobService.getJobList(req.query);
        const response = GetJobListResponse(result);
        
        Logger.info(response);
        res.send(BaseResponse.successResponse(response));
    } catch (err) {
        Logger.error(err);
        res.status(err.errorCode || 500).send(BaseResponse.errorResponse(err));
    }
};

const getJobDetail = async (req, res) => {
    const { params: { id } } = req;

    try {
        const result = await JobService.getJobDetail(id);
        const response = GetJobDetailResponse(result);
        
        Logger.info(response);
        res.send(BaseResponse.successResponse(response));
    } catch (err) {
        Logger.error(err);
        res.status(err.errorCode || 500).send(BaseResponse.errorResponse(err));
    }
};

module.exports = {
    getJobList: getJobList,
    getJobDetail: getJobDetail
};