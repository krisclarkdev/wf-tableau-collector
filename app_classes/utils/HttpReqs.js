const axios = require("axios");
const MyLogger = require("./MyLogger");

class HttpReqs extends MyLogger {
    constructor(className) {
        super(className);
    }

    doGet(url, headers, body) {
        return axios({
            method: "get",
            url: url,
            headers: headers
        });
    }

    doPost(url, headers, body) {
        return axios({
            method: "post",
            url: url,
            headers: headers,
            data: body
        });
    }
}

module.exports = HttpReqs;