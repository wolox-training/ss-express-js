const { statusCodes } = require('../constants/codes');

exports.healthCheck = (_, res) => res.status(statusCodes.OK).send({ uptime: process.uptime() });
