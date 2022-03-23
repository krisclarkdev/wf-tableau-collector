'use strict';

const xml2js = require('xml2js');

class XMLParser {
    constructor() {}

    parseXML(xml) {
        return new Promise((resolve, reject)=>{
            xml2js.parseString(xml, (xmlParsingErr, xmlResult) => {
                if(xmlParsingErr) {
                    reject(xmlParsingErr);
                }else{
                    resolve(xmlResult);
                }
            });
        })
    }
}

module.exports = XMLParser;