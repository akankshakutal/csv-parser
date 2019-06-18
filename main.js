const fs = require("fs");
const papaparse = require("papaparse");
const { parser } = require("./src/csvparser.js");
const SOURCE_FILE_PATH = "./formated_weather.csv";
const DESTINATION_FILE_PATH = "./newWeather.csv"
const UNICODE = "utf8";

const main = function() {
  let weatherData = fs.readFileSync(SOURCE_FILE_PATH, UNICODE);
  let jsonData = papaparse.parse(weatherData, { header: true });
  console.log(jsonData.data);
  let rawJson = parser(jsonData.data);
  let result = [];
  rawJson.shift();
  result = result.concat(...rawJson).filter(element => element);
  fs.writeFileSync(DESTINATION_FILE_PATH, papaparse.unparse(result));
};

main();
