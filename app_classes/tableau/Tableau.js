'use strict';

const csvtojsonV2 = require("csvtojson");
const AppProperties = require("../props/AppProperties");
const XMLParser = require("../utils/XMLParser");
const HttpReqs = require("../utils/HttpReqs");
const winston = require("winston");
const MyLogger = require("../utils/MyLogger");

let appProps = new AppProperties();
let parser   = new XMLParser();

let logger = new MyLogger('wf-tableau-collector-Tableau');

class Tableau extends HttpReqs {
    constructor(){
        super();
    }

    login() {
        let authResponse = super.doPost(appProps.baseURL + "/" +
            appProps.version +
            appProps.endpointAuth,
            null,
            appProps.authXML);

        return new Promise((resolve, reject)=>{
            authResponse.then((auth)=>{
                parser.parseXML(auth.data).then((cleanXML)=>{
                    resolve(cleanXML.tsResponse.credentials[0]['$'].token);
                }).catch(xmlErr=>{
                    reject(xmlErr);
                });
            }).catch((ae)=>{
                reject(ae);
            });
        });
    }

    extractAuthToken(authResponse) {
        return new Promise((resolve, reject)=>{
            authResponse.then((auth)=>{
                resolve(auth.tsResponse.credentials[0]['$'].token);
            }).catch((err)=>{
                reject(err);
            });
        });
    }

    getSites(token) {
        return new Promise((resolve, reject)=>{
            let sitesResponse = super.doGet(appProps.baseURL + "/" +
                appProps.version +
                appProps.endpointSites,
                {
                    "X-Tableau-Auth": token
                },
                null);

            sitesResponse.then(sitesData=>{
                resolve(sitesData.data.sites);
            }).catch(err=>{
                reject(err);
            });
        });
    }

    getViews(token, siteID) {
        return new Promise((resolve, reject)=>{
            let viewResponse = super.doGet(appProps.baseURL + "/" +
                appProps.version +
                appProps.endpointViews.replace(/dummysite/g, siteID), //findme
                {
                    "X-Tableau-Auth": token
                },
                null);

            viewResponse.then(viewData=>{
                resolve(viewData.data); // check this for correctness
            }).catch(err=>{
                reject(err);
            });
        });
    }

    getData(token, siteID, viewID) {
        return new Promise((resolve, reject)=>{
            let dataEndpoint = appProps.endpointViewsData;
            dataEndpoint = dataEndpoint.replace(/dummysite/g, siteID);
            dataEndpoint = dataEndpoint.replace(/dummyview/g, viewID);

            let dataResponse = super.doGet(appProps.baseURL + "/" +
                appProps.version +
                dataEndpoint,
                {
                    "Accept": "application/json",
                    "X-Tableau-Auth": token
                },
                null);

            dataResponse.then(viewData=>{
                resolve({
                    view: appProps.contentURL,
                    data: viewData}); // check this for correctness
            }).catch(err=>{
                reject(err);
            });
        }).catch((dataFetchErr)=>{
            logger.error(dataFetchErr);
        });
    }

    getWorkbookViews(token, siteID, workbookID) {
        return new Promise((resolve, reject)=>{
            let workbookEndpoint = appProps.endpointWorkbookViews;
            workbookEndpoint = workbookEndpoint.replace(/dummysite/g, siteID);
            workbookEndpoint = workbookEndpoint.replace(/dummyworkbook/g, workbookID);

            let workbookResponse = super.doGet(appProps.baseURL + "/" +
                appProps.version +
                workbookEndpoint,
                {
                    "X-Tableau-Auth": token
                },
                null);

            workbookResponse.then(workbookData=>{
                resolve(workbookData.data.workbook.views.view); // check this for correctness
            }).catch(err=>{
                reject(err);
            });
        }).catch((workbookFetchErr)=>{
            logger.error(workbookFetchErr);
        });
    }

    getWorkbookDataByID(siteID, workbookID) {
        let loginToken = new Promise((resolve1, reject1)=>{
            this.login().then((authToken)=>{
                resolve1(authToken);
            }).catch((loginError)=>{
                reject1(loginError)
            })
        });

        let workbookViews = new Promise((resolve2,reject2)=>{
            let workbookViewsArray = [];
            loginToken.then((authtoken)=>{
                this.getWorkbookViews(authtoken,siteID,workbookID).then((wbViews)=>{
                    wbViews.forEach(view=>{
                        workbookViewsArray.push({
                            contentUrl: view.contentUrl.replace(/\//g, '.'),
                            viewID: view.id
                        });
                    });
                    resolve2(workbookViewsArray);
                }).catch((wbViewsFetchError)=>{
                    reject2(wbViewsFetchError);
                });
            });
        }).catch((wbViewsFetchError)=>{
            logger.error(wbViewsFetchError);
        })


        let workbookData = new Promise((resolve3,reject3)=>{
            let allViewDataArray = [];
            Promise.all([loginToken, workbookViews]).then((values) => {
                values[1].forEach((view=>{
                    allViewDataArray.push(this.getData(values[0], siteID,view.viewID, view.contentUrl));
                }))
                resolve3(allViewDataArray);
            }).catch((err)=>{
                reject3(err);
            });
        })

        let data = new Promise((resolve4,reject4)=>{
            workbookData.then((promiseArray)=>{
                Promise.all(promiseArray).then((allData)=>{
                    resolve4(allData);
                }).catch((workbookDataError)=>{
                    logger.error(workbookDataError);
                })
            })
        });

        return new Promise((convertedDataResolve,convertedDataReject)=>{
            data.then((allData)=>{
                let dataRows = [];
                allData.forEach(current=>{
                    let currentRow = new Promise((currentRowResolve,currentRowReject)=>{
                        csvtojsonV2().fromString(current.data.data).then((convertedCVS)=>{
                            convertedCVS['view'] = current.view;

                            let finished = {
                                'view': current.view,
                                'data': convertedCVS
                            }

                            currentRowResolve(finished);
                        })
                    }).catch((convertingDataError)=>{
                        convertedDataReject(convertingDataError);
                    })
                    dataRows.push(currentRow);
                });

                Promise.all(dataRows).then((allDataRows)=>{
                    convertedDataResolve(allDataRows);
                });
            }).catch((allConvertedDataError)=>{
                logger.error(allConvertedDataError);
            })
        });
    }
}

module.exports = Tableau;