const Joi = require('joi');
const router = require('express').Router();
const RequestValidation = require('../middlewares/RequestValidation');
const JobController = require('../controllers/JobController');

router.get(
    '',
    RequestValidation.validateRequest(
        {
            query: Joi.object().keys({
                description: Joi.string().min(1).optional(),
                location: Joi.string().min(1).optional(),
                full_time: Joi.boolean().optional(),
                page: Joi.number().min(1).optional()
            })
        },
        'query'
    ),
    JobController.getJobList
);

router.get(
    '/:id',
    RequestValidation.validateRequest(
        {
            params: Joi.object().keys({
                id: Joi.string().min(1).required()
            })
        },
        'params'
    ),
    JobController.getJobDetail
);

module.exports = router;