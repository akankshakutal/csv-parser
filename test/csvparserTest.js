const assert = require("assert");
const WeatherParser = require("../src/csvparser.js");
const { parse, unparse } = require("papaparse");

describe("WeatherParser", function() {
  it("should give array of object", function() {
    let input = "unnamed,1 of 1 2017 Weather,2 of 2 2017 Weather\n";
    input += "708 F4L Chicago,1000,1200";
    let actual = WeatherParser.csvParser(input, parse);
    let data1 = {
      week: 1,
      periodNumber: 1,
      year: 2017,
      impactorType: "Weather",
      amount: "1000",
      divisionNumber: 708,
      comment: "Comment",
      reason: "Other"
    };
    let data2 = {
      week: 2,
      periodNumber: 2,
      year: 2017,
      impactorType: "Weather",
      amount: "1200",
      divisionNumber: 708,
      comment: "Comment",
      reason: "Other"
    };
    let expected = [[data1, data2]];
    assert.deepEqual(actual, expected);
  });

  it("should give array with first element undefined when amount is empty", function() {
    let input = "unnamed,1 of 1 2017 Weather,2 of 2 2017 Weather\n";
    input += "708 F4L Chicago,,1200";
    let actual = WeatherParser.csvParser(input, parse);
    data2 = {
      amount: 1200,
      comment: "Comment",
      divisionNumber: 708,
      impactorType: "Weather",
      periodNumber: 2,
      reason: "Other",
      week: 2,
      year: 2017
    };
    let expected = [[undefined, data2]];
    assert.deepEqual(actual, expected);
  });

  it("should give array with first element undefined when amount is 0.00", function() {
    let input = "unnamed,1 of 1 2017 Weather,2 of 2 2017 Weather\n";
    input += "708 F4L Chicago,0.00,1200";
    let actual = WeatherParser.csvParser(input, parse);
    data2 = {
      amount: 1200,
      comment: "Comment",
      divisionNumber: 708,
      impactorType: "Weather",
      periodNumber: 2,
      reason: "Other",
      week: 2,
      year: 2017
    };
    let expected = [[undefined, data2]];
    assert.deepEqual(actual, expected);
  });

  it("should give array with first element undefined when impactorType is diff than weather", function() {
    let input = "unnamed,1 of 1 2017 Snap,2 of 2 2017 Weather\n";
    input += "708 F4L Chicago,1000,1200";
    let actual = WeatherParser.csvParser(input, parse);
    data2 = {
      amount: 1200,
      comment: "Comment",
      divisionNumber: 708,
      impactorType: "Weather",
      periodNumber: 2,
      reason: "Other",
      week: 2,
      year: 2017
    };
    let expected = [[undefined, data2]];
    assert.deepEqual(actual, expected);
  });

  it("should give array with first element undefined when impactorType is not defined", function() {
    let input = "unnamed,1 of 1 2017,2 of 2 2017 Weather\n";
    input += "708 F4L Chicago,1000,1200";
    let actual = WeatherParser.csvParser(input, parse);
    data2 = {
      amount: 1200,
      comment: "Comment",
      divisionNumber: 708,
      impactorType: "Weather",
      periodNumber: 2,
      reason: "Other",
      week: 2,
      year: 2017
    };
    let expected = [[undefined, data2]];
    assert.deepEqual(actual, expected);
  });

  it("should give array with first element undefined when periodNumber is missing", function() {
    let input = "unnamed,1 of 2017 Weather,2 of 2 2017 Weather\n";
    input += "708 F4L Chicago,'',1200";
    let actual = WeatherParser.csvParser(input, parse);
    data2 = {
      amount: 1200,
      comment: "Comment",
      divisionNumber: 708,
      impactorType: "Weather",
      periodNumber: 2,
      reason: "Other",
      week: 2,
      year: 2017
    };
    let expected = [[undefined, data2]];
    assert.deepEqual(actual, expected);
  });

  it("should give string of data", function() {
    let data1 = {
      week: 1,
      periodNumber: 1,
      year: 2017,
      impactorType: "Weather",
      amount: "1000",
      divisionNumber: 708,
      comment: "Comment",
      reason: "Other"
    };
    data2 = {
      week: 2,
      periodNumber: 2,
      year: 2017,
      impactorType: "Weather",
      amount: "1200",
      divisionNumber: 708,
      comment: "Comment",
      reason: "Other"
    };
    let input = [data1, data2];
    let actual = WeatherParser.jsonParser(input, unparse);
    let expected =
      "week,periodNumber,year,impactorType,amount,divisionNumber,comment,reason\r\n";
    expected += "2,2,2017,Weather,1200,708,Comment,Other";
    assert.equal(actual, expected);
  });
});
