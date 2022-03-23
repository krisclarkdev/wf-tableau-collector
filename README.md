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
git clone https://...
cd wf-tableau-collector
npm install
node ./index.js
curl http://localhost:3000/workbook/dataByID/TABLEAUSITEID/TABLEAUWORKBOOKID
```

# DO NOT CHANGE ANYTHING IN THE CONFIG FILES WITH THE WORD DUMMY