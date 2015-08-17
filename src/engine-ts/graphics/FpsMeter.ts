/// <reference path="../../../typings/fpsmeter/FPSMeter.d.ts" />

export default class FpsMeter extends FPSMeter {
    constructor(options: FPSMeterOptions = {}) {
        if (typeof options.heat === "undefined") {
            options.heat = 1;
        }

        if (typeof options.graph === "undefined") {
            options.graph = 1;
        }

        if (typeof options.top === "undefined") {
            options.top = "auto";
        }

        if (typeof options.bottom === "undefined") {
            options.bottom = "5px";
        }

        super(document.body, options);
    }
}
