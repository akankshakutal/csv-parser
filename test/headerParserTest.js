const assert = require("assert");
const { parseHeader } = require("../src/headerParser.js");

describe("parseHeader", function () {
    it("should give object ", function () {
        let input = "1 of 13 2018 Weather";
        let actual = parseHeader(input);
        let expected = { week:1, periodNumber:13, year:2018, impactorType:"Weather" };
        assert.deepEqual(actual,expected);
    });

    it("should give undefind for ImpactorType if any one field is missing ", function () {
        let input = "1 of 2018 Weather";
        let actual = parseHeader(input);
        let expected = { week: 1, periodNumber: 2018, year: null, impactorType: undefined };
        assert.deepEqual(actual, expected);
    });
});
