'use strict';

const PropertiesReader = require("properties-reader");
const properties = PropertiesReader("config/wavefront.properties");

class WavefrontProperties {
    constructor(){
    }

    get token(){return properties.get("wavefront.token")}
    get url(){return properties.get("wavefront.url")}
    get source(){return properties.get("metric.source")}
    get prefix(){return properties.get("metric.prefix")}

    set token(token){}
    set url(url){}
    set source(source){}
    set prefix(prefix){}
}

module.exports = WavefrontProperties;