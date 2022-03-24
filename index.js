'use strict';

const winston   = require('winston');
const express   = require('express');
const Tableau   = require("./app_classes/tableau/Tableau");
const Wavefront = require("./app_classes/wavefront/Wavefront");

let   wavefront = new Wavefront();

const app       = express();
const port      = process.env.TABLEAU_COLLECTOR_PORT || 3000;

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'wf-tableau-collector-index' },
    transports: [
        new winston.transports.File({ filename: process.env.WF_TABLEAU_COLLECTOR_ERROR_LOG    || 'error.log', level: 'error' }),
        new winston.transports.File({ filename: process.env.WF_TABLEAU_COLLECTOR_COMBINED_LOG || 'combined.log' }),
    ],
});

wavefront.startReporter();

let tableau = new Tableau();

app.get('/workbook/dataByID/:siteid/:workbookid', (req, res) => {
    let data = tableau.getWorkbookDataByID(req.params.siteid, req.params.workbookid);
    data.then((data)=>{

        // TODO: Loop over data, identify metrics, and send them via wf.sendMetric()

        // This is temporary just to test metics getting into Wavefront
        wavefront.sendMetric("test",Math.floor(Math.random() * (50 - 1 + 1)) + 1,{"key1":"val1"})

        res.send(data);
    }).catch((err)=>{
        logger.error(err);
    })
});

app.listen(port, () => logger.info(`Hello world app listening on port ${port}!`))