'use strict';

const WavefrontProperties = require('./WavefrontProperties');
const fs = require("fs");
const PropertiesReader = require("properties-reader");

class TableauProperties extends WavefrontProperties {
    constructor(){
        super();
        this.tProperties = PropertiesReader(process.env.TABLEAU_COLLECTOR_TABLEAU_PROPS || "config/tableau.properties");
    }

    get username(){return this.tProperties.get("username")};
    get password(){return this.tProperties.get("password")};
    get baseURL(){return this.tProperties.get("base_url")};
    get contentURL(){return this.tProperties.get("contentUrl")};
    get authXML(){
        let data = fs.readFileSync(process.env.TABLEAU_COLLECTOR_AUT_XML || "config/tableauLogin.xml").toString();
        data = data.replace(/dummyuserdonottouch/g, this.tProperties.get("username"));
        data = data.replace(/dummypassdonottouch/g, this.tProperties.get("password"));
        data = data.replace(/dummyContentUrldonottouch/g, this.tProperties.get("contentUrl"));

        return data;
    };
    get version(){return this.tProperties.get("api_version")};
    get endpointAuth(){return this.tProperties.get("endpoint.auth")}
    get endpointSites(){return this.tProperties.get("endpoint.sites")}
    get endpointViews(){return this.tProperties.get("endpoint.views")}
    get endpointViewsData(){return this.tProperties.get("endpoint.views.data")}
    get endpointWorkbookViews(){return this.tProperties.get("endpoint.workbooks.views")}

    set username(username){};
    set password(password){};
    set baseURL(baseURL){};
    set contentURL(contentURL){};
    set authXML(authXML){};
    set version(version){};
    set endpointSites(sites){};
    set endpointViews(views){};
    set endpointViewsData(viewsData){};
    set endpointWorkbookViews(workbookViews){};
    set endpointAuth(auth){};
}

module.exports = TableauProperties;