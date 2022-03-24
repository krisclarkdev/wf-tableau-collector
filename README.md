# wf-tableau-collector

## Introduction
wf-tableau-collector is a simple NodeJS app who's purpose is to collect data from all views in a Tableau workbook for
to be transformed into metrics and sent to Wavefront via direct reporter.

## Warning
This is still very much a work in progress proceed at your own risk

## Enviornment tested against
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

## How to run

* There are the config files under wf-tableau-collector
  * tableau.properties
  * tableauLogin.xml
  * wavefront.properties
* Update these with your settings from Wavefront and Tableau

```shell
git clone https://github.com/krisclarkdev/wf-tableau-collector
cd wf-tableau-collector
npm install
node ./index.js
curl http://localhost:3000/workbook/dataByID/TABLEAUSITEID/TABLEAUWORKBOOKID
```

* Alternatively you can build a binary and execute it from the binaries directory for the appropriate platform
  * The following enviornment variables must be set prior to running the binary
    * TABLEAU_COLLECTOR_PORT=SOMEPORT
    * TABLEAU_COLLECTOR_TABLEAU_PROPS/pathTo/theConfig/[tableau.properties](https://raw.githubusercontent.com/krisclarkdev/wf-tableau-collector/master/config/tableau.properties)
    * TABLEAU_COLLECTOR_WF_PROPS=/pathTo/theConfig/[wavefront.properties](https://raw.githubusercontent.com/krisclarkdev/wf-tableau-collector/master/config/wavefront.properties)
    * TABLEAU_COLLECTOR_AUT_XML=/pathTo/theConfig/[tableauLogin.xml](https://raw.githubusercontent.com/krisclarkdev/wf-tableau-collector/master/config/tableauLogin.xml)

# DO NOT CHANGE ANYTHING IN THE CONFIG FILES WITH THE WORD DUMMY

### How to build

```shell
git clone https://github.com/krisclarkdev/wf-tableau-collector
cd wf-tableau-collector
npm run build
```