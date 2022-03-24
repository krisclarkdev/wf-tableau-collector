const MyLogger = require("./MyLogger");

class HttpReqs extends MyLogger {
    axios = require("axios");
    constructor(className) {
        super(className);
    }

    doGet(url, headers, body) {
        return this.axios({
            method: "get",
            url: url,
            headers: headers
        });
    }

    doPost(url, headers, body) {
        return this.axios({
            method: "post",
            url: url,
            headers: headers,
            data: body
        });
    }
}

module.exports = HttpReqs;