'use strict';

const WavefrontProperties = require("../props/WavefrontProperties");

class Wavefront extends WavefrontProperties {
    constructor() {
        super();
        this.metrics  = require("wavefrontmetrics");
        this.registry = new this.metrics.Registry();
        this.directReporter = new this.metrics.WavefrontDirectReporter(this.registry, this.source,
            this.url,
            this.token,
            {"source": this.source});
    }

    startReporter() {
        this.directReporter.start(5000);
    }

    metricValue(value) {
        return new this.metrics.Gauge(() => {
            return value;
        });
    }

    sendMetric(metricName, metricValue, metricTags) {
        this.registry.addTaggedMetric(metricName, this.metricValue(metricValue), metricTags);
    }
}

module.exports = Wavefront;