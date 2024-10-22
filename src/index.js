const express = require('express');
const { serverConfig,Logger,DB } = require('./config');
const apiRoutes = require('./routes')
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api',apiRoutes);

// coneection with DB
DB(); 


app.listen(serverConfig.PORT,()=>{
    console.log(`Server Started At ${serverConfig.PORT}`);
    Logger.info("Successfully Started the Server","Akhil",{},"This is label")
});
