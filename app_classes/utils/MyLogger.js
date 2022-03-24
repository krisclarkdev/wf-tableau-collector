const winston = require("winston");

class MyLogger {
    constructor(className) {
        let location = "";
        if(process.env.WF_TABLEAU_COLLECTOR_LOG_LOCATION){
            location = process.env.WF_TABLEAU_COLLECTOR_LOG_LOCATION;
        }else{
            location = '';
        }

        this.myLogger = winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            defaultMeta: { service: className },
            transports: [
                new winston.transports.File({ filename: location + 'error.log'    || 'error.log', level: 'error' }),
                new winston.transports.File({ filename: location + 'error.log' || 'combined.log' }),
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