'use strict';

class WavefrontProperties {
    PropertiesReader = require("properties-reader");

    constructor(){
        if(process.env.TABLEAU_COLLECTOR_CONFIG){
            this.location = process.env.TABLEAU_COLLECTOR_CONFIG + "/wavefront.properties"
        }else{
            this.location = "config/wavefront.properties"
        }

        this.properties = this.PropertiesReader(this.location);
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