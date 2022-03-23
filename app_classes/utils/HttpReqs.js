const axios = require("axios");

class HttpReqs {
    constructor() {}

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