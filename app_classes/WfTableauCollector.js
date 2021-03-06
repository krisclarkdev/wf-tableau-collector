'use strict';

const MyLogger  = require("./utils/MyLogger");

class WfTableauCollector extends MyLogger {
    express   = require('express');
    Tableau   = require("./tableau/Tableau");
    Wavefront = require("./wavefront/Wavefront");

    constructor() {
        super('wf-tableau-collector')

        this.wavefront = new this.Wavefront();
        this.tableau   = new this.Tableau();
        this.app       = this.express();
        this.port      = process.env.TABLEAU_COLLECTOR_PORT || 3000;
    }

    start() {
        this.wavefront.startReporter();


        this.app.get('/workbook/dataByID/:siteid/:workbookid', (req, res) => {
            let data = this.tableau.getWorkbookDataByID(req.params.siteid, req.params.workbookid);
            data.then((data)=>{

                // TODO: Loop over data, identify metrics, and send them via wf.sendMetric()

                // This is temporary just to test metics getting into Wavefront
                this.wavefront.sendMetric("test",Math.floor(Math.random() * (50 - 1 + 1)) + 1,{"key1":"val1"})

                res.send(data);
            }).catch((err)=>{
                this.logger.error(err);
            })
        });

        this.app.listen(this.port, () => super.logger.info(`Hello world app listening on port ${this.port}!`))
    }
}

module.exports = WfTableauCollector;