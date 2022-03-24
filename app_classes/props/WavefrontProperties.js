'use strict';

class WavefrontProperties {
    PropertiesReader = require("properties-reader");

    constructor(){
        this.properties = this.PropertiesReader(process.env.TABLEAU_COLLECTOR_WF_PROPS || "config/wavefront.properties");
    }

    get token(){return this.properties.get("wavefront.token")}
    get url(){return this.properties.get("wavefront.url")}
    get source(){return this.properties.get("metric.source")}
    get prefix(){return this.properties.get("metric.prefix")}

    set token(token){}
    set url(url){}
    set source(source){}
    set prefix(prefix){}
}

module.exports = WavefrontProperties;