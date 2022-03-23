'use strict';

const express   = require('express');
const Tableau   = require("./app_classes/tableau/Tableau");
const Wavefront = require("./app_classes/wavefront/Wavefront");

let   wavefront = new Wavefront();

const app       = express();
const port      = 3000;

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
        console.error(err);
    })
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))