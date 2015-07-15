/* global describe, it, beforeEach, afterEach */
import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";

chai.should();
chai.use(sinonChai);

import Color from "../src/engine/Color"

const COLOR_WHITE   = 0xFFFFFF;
const COLOR_RED     = 0xFF0000;
const COLOR_GREEN   = 0x00FF00;
const COLOR_BLUE    = 0x0000FF;
const COLOR_FUCHSIA = 0xFF00FF;
const COLOR_YELLOW  = 0xFFFF00;

describe("Color", () => {
    describe("#intToRgb", () => {
        const tests = [
            { input: 0, output: { r: 0, g: 0, b: 0 } },
            { input: COLOR_WHITE, output: { r: 255, g: 255, b: 255 } },
            { input: COLOR_RED, output: { r: 255, g: 0, b: 0 } },
            { input: COLOR_GREEN, output: { r: 0, g: 255, b: 0 } },
            { input: 255, output: { r: 0, g: 0, b: 255 } },
            { input: 8065664, output: { r: 123, g: 18, b: 128 } }
        ];

        tests.forEach((test) => {
            it(`converts the int ${test.input} to rgb(${test.output.r},${test.output.g},${test.output.b})`, () => {
                Color.intToRgb(test.input).should.deep.equal(test.output);
            });
        });
    });

    describe("#rgbToInt", () => {
        const tests = [
            { input: { r: 0, g: 0, b: 0 }, output: 0 },
            { input: { r: 255, g: 255, b: 255 }, output: COLOR_WHITE },
            { input: { r: 255, g: 0, b: 0 }, output: COLOR_RED },
            { input: { r: 0, g: 255, b: 0 }, output: COLOR_GREEN },
            { input: { r: 0, g: 0, b: 255 }, output: COLOR_BLUE },
            { input: { r: 123, g: 18, b: 128 }, output: 0x7B1280 }
        ];

        tests.forEach((test) => {
            it(`converts the rgb(${test.input.r},${test.input.g},${test.input.b}) to int ${test.output}`, () => {
                Color.rgbToInt(test.input).should.deep.equal(test.output);
            });
        });
    });

    describe("#mixColors", () => {
        const tests = [
            { c1: 0, c2: 0, result: 0 },
            { c1: 0, c2: COLOR_WHITE, result: COLOR_WHITE },
            { c1: 0, c2: COLOR_WHITE, result: COLOR_WHITE },
            { c1: COLOR_WHITE, c2: COLOR_WHITE, result: COLOR_WHITE },
            { c1: COLOR_RED, c2: COLOR_BLUE, result: COLOR_FUCHSIA },
            { c1: 0xB27979, c2: 0xB7CEB9, result: 0xB7CEB9 },
            { c1: COLOR_RED, c2: COLOR_GREEN, result: COLOR_YELLOW }
        ];

        tests.forEach((test) => {
            it(`mixes the colours ${test.c1} and ${test.c2} to make ${test.result}`, () => {
                Color.mixColors(test.c1, test.c2).should.equal(test.result);
            });
        });
    });

    describe("#addColors", () => {
        const tests = [
            { c1: 0, c2: 0, result: 0 },
            { c1: 0, c2: COLOR_WHITE, result: 0x7F7F7F },
            { c1: 0, c2: COLOR_WHITE, result: 0x7F7F7F },
            { c1: COLOR_WHITE, c2: COLOR_WHITE, result: COLOR_WHITE },
            { c1: COLOR_RED, c2: COLOR_BLUE, result: 0x7F007F },
            { c1: 0xB27979, c2: 0xB7CEB9, result: 0xB4A399 },
            { c1: COLOR_RED, c2: COLOR_GREEN, result: 0x7F7F00 }
        ];

        tests.forEach((test) => {
            it(`adds the colours ${test.c1} and ${test.c2} to make ${test.result}`, () => {
                Color.addColors(test.c1, test.c2).should.equal(test.result);
            });
        });
    });

    describe("#addColorsByIntensity", () => {
        it("adds the colours by intensity");
    });

    describe("#mixColorsByIntensity", () => {
        it("mixes the colours by intensity");
    });

    describe("#applyIntensity", () => {
        it("applies the intensity");
    });
});
