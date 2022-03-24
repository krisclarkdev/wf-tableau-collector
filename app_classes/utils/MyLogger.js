class MyLogger {
    winston = require("winston");

    constructor(className) {
        let location = "";
        if(process.env.WF_TABLEAU_COLLECTOR_LOG_LOCATION){
            location = process.env.WF_TABLEAU_COLLECTOR_LOG_LOCATION;
        }else{
            location = './';
        }

        this.myLogger = this.winston.createLogger({
            level: 'info',
            format: this.winston.format.json(),
            defaultMeta: { service: className },
            transports: [
                new this.winston.transports.File({ filename: location + 'error.log', level: 'error' }),
                new this.winston.transports.File({ filename: location + 'error.log'}),
            ],
        })

        this.logsLocation = location;
    }

    get logsLocation() {
        return this.logsLocation;
    }

    set logsLocation(location){}

    get logger() {
        return this.myLogger;
    }

    set logger(loggerClassName) {
    }

}

module.exports = MyLogger;