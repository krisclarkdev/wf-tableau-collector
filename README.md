# Introduction
wf-tableau-collector is a simple NodeJS app whose purpose is to collect data from all views in a Tableau workbook
to be transformed into metrics and sent to [Wavefront](https://tanzu.vmware.com/observability) - an enterprise observability platform - via direct reporter.

* [Introduction](#introduction)
* [TODO](#todos)
* [Environment](#enviornment-tested-against)
* [Properties](#properties)
* [How to run](#how-to-run)
* [How to build](#how-to-build)
* [Build deb installer (not yet tested)](#build-the-deb-package)

# TODO's
* Need to decide on what data that is recieved by all of the views should be included and then send it to Wavefront at [line #27 of WFTableauCollector.js](https://github.com/krisclarkdev/wf-tableau-collector/blob/02f1535087e473f55d83f6ed7ba24ffdcdcc379c/app_classes/WfTableauCollector.js#L27)
* Test deb installer

# Enviornment tested against
* MacBook Pro
  * 16-inch 2019
  * 2.4 GHz 8-Core Intel Core i9
  * Memory 32 GB 2667 MHz DDR4

* WebStorm
  * 2021.3.3
  * Build #WS-213.7172.31

* NodeJS
  * 14.15.0
  * Provided by WebStorm IDE

# Properties

## tableau.properties

| Syntax                   | Description                        | Example                                   | Needs to be changed | Required |
|--------------------------|------------------------------------|-------------------------------------------|---------------------|----------|
| Username                 | Tableau Username                   | nonadmin                                  | ✅               | ✅      |
| Password                 | Tableau Password                   | password                                  | ✅               | ✅    |
| api_version              | Tableau REST Version               | 3.13                                      | ✅               | ✅    |
| contentUrl               | STUFF                              | Org                                       | ✅               | ✅    |
| base_url                 | Tableau API URL                    | https://yoursite.tableau.com              | ✅               | ✅    |
| endpoint.auth            | Tableau authentication endpoint    | /auth/signin                              | ❌               | ✅    |
| endpoint.sites           | Tableau sites endpoint             | /sites                                    | ❌               | ✅    |
| endpoint.views           | Tableau views endpoint             | /sites/dummysite/views                    | ❌               | ✅    |
| endpoint.views.data      | Tableau views data endpoint        | /sites/dummysite/views/dummyview/data     | ❌               | ✅    |
| endpoint.workbooks.views | Tableau workbook views endpoint    | /sites/dummysite/workbooks/dummyworkbook  | ❌               | ✅    |


## tableauLogin.xml

| Syntax | Description         | Do not change  |
| --- |------------------------|----------------|
| name | Tableau username      | ✅        |
| password | Tableau password  | ✅        |
| contentUrl   | Tableau URL   | ✅        |

## wavefront.properties

| Syntax           | Description                     | Example                   | Required   | Should be changed | Documentation                                                 |
|------------------|---------------------------------|---------------------------|------------|-------------------|---------------------------------------------------------------|
| wavefront.token  | Your Wavefront REST Token       |                           | ✅    | ✅           | [here](https://docs.wavefront.com/wavefront_api.html)         |
| wavefront.url    | Your Wavefront URL              | https://try.wavefront.com | ✅    | ✅           |                                                               |
| metric.source    | A source name for these metrics | tableauCollectorMetrics   | ✅    | ❌           | [here](https://docs.wavefront.com/sources_managing.html)      |
| metric.prefix    | A metric name prefix            | tableau.view.data         | ✅    | ❌           | [here](https://docs.wavefront.com/wavefront_data_format.html) |

# How to run

* There are the config files under wf-tableau-collector
  * tableau.properties
  * tableauLogin.xml
  * wavefront.properties
* Update these with your settings from Wavefront and Tableau
  * A wavefront token can be retireved or created from the service accounts page located at https://YOURWAVEFRONTURL/account/serviceaccounts

```shell
git clone https://github.com/krisclarkdev/wf-tableau-collector
cd wf-tableau-collector
npm install
npm run start
curl http://localhost:3000/workbook/dataByID/TABLEAUSITEID/TABLEAUWORKBOOKID
```

* Alternatively you can build a binary and execute it from the binaries directory for the appropriate platform
  * The following environment variables must be set prior to running the standalone binary
    * TABLEAU_COLLECTOR_PORT=SOMEPORT
    * TABLEAU_COLLECTOR_CONFIG=/pathTo/all/configFiles
      * [tableau.properties](https://raw.githubusercontent.com/krisclarkdev/wf-tableau-collector/master/config/tableau.properties)
      * [wavefront.properties](https://raw.githubusercontent.com/krisclarkdev/wf-tableau-collector/master/config/wavefront.properties)
      * [tableauLogin.xml](https://raw.githubusercontent.com/krisclarkdev/wf-tableau-collector/master/config/tableauLogin.xml)
    * WF_TABLEAU_COLLECTOR_LOG_LOCATION=/pathTo/logLocation/

# How to build

```shell
git clone https://github.com/krisclarkdev/wf-tableau-collector
cd wf-tableau-collector
npm run build-prod
npm run build-prod-arm
```
# Build the deb package

```shell
git clone https://github.com/krisclarkdev/wf-tableau-collector
cd wf-tableau-collector/installers/deb
dpkg-deb --build --root-owner-group WFTableauCollector-0.1.0_x64
```

This has been built but not verified and tested