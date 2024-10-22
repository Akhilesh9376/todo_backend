const express = require('express');
const apiRoutes = express.Router();
const v1Routes = require('./v1')


apiRoutes.use('/v1',v1Routes);

module.exports = apiRoutes ;
