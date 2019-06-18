const assert = require("assert");
const { parseHeader } = require("../src/headerParser.js");

describe("parseHeader", function () {
    it("should give object ", function () {
        let input = "1 of 13 2018 Weather";
        let actual = parseHeader(input);
        let expected = { week:1, periodNumber:13, year:2018, impactorType:"Weather" };
        assert.deepEqual(actual,expected);
    });
});
