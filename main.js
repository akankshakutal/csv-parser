const fs = require("fs");
const papaparse = require("papaparse");
const { parser } = require("./src/csvparser.js");

const main = function() {
  weatherData = fs.readFileSync("./weather.csv", "utf8");
  let jsonData = papaparse.parse(weatherData, { header: true });
  let rawJson = parser(jsonData.data);
  rawJson.shift();
  let result = [];
  result = result.concat(...rawJson);
  console.log(result.filter(element => element));
};

main();
