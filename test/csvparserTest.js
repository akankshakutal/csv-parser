const assert = require("assert");
const { parser } = require("../src/csvparser.js");

describe("parser", function() {
  it("should give array of object", function() {
    let input = [
      { unnamed: "708 F4L Chicago", "1 of 1 2017 Weather": 1000 },
      { unnamed: "708 F4L Chicago", "2 of 2 2017 Weather": 1200 }
    ];
    let actual = parser(input);
    let data1 = {
      amount: 1000,
      comment: "Comment",
      divisionNumber: 708,
      impactorType: "Weather",
      periodNumber: 1,
      reason: "Other",
      week: 1,
      year: 2017
    };
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
    let expected = [[data1], [data2]];
    assert.deepEqual(actual, expected);
  });

  it("should give array with first element undefined when amount is empty", function() {
    let input = [
      { unnamed: "708 F4L Chicago", "1 of 1 2017 Weather": "" },
      { unnamed: "708 F4L Chicago", "2 of 2 2017 Weather": 1200 }
    ];
    let actual = parser(input);
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
    let expected = [[undefined], [data2]];
    assert.deepEqual(actual, expected);
  });

  it("should give array with first element undefined when amount is 0.00", function() {
    let input = [
      { unnamed: "708 F4L Chicago", "1 of 1 2017 Weather": 0.0 },
      { unnamed: "708 F4L Chicago", "2 of 2 2017 Weather": 1200 }
    ];
    let actual = parser(input);
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
    let expected = [[undefined], [data2]];
    assert.deepEqual(actual, expected);
  });

  it("should give array with first element undefined when impactorType is diff than weather", function() {
    let input = [
      { unnamed: "708 F4L Chicago", "1 of 1 2017 Snap": 1000 },
      { unnamed: "708 F4L Chicago", "2 of 2 2017 Weather": 1200 }
    ];
    let actual = parser(input);
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
    let expected = [[undefined], [data2]];
    assert.deepEqual(actual, expected);
  });

  it("should give array with first element undefined when periodNumber is missing", function() {
    let input = [
      { unnamed: "708 F4L Chicago", "1 of 2017 Weather": 1000 },
      { unnamed: "708 F4L Chicago", "2 of 2 2017 Weather": 1200 }
    ];
    let actual = parser(input);
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
    let expected = [[undefined], [data2]];
    assert.deepEqual(actual, expected);
  });
});
