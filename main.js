const fs = require("fs");
const { parse, unparse } = require("papaparse");
const WeatherParser = require("./src/csvparser.js");
const SOURCE_FILE_PATH = "./formated_weather.csv";
const DESTINATION_FILE_PATH = "./newWeather.csv";
const UNICODE = "utf8";

const main = function() {
  let weatherData = fs.readFileSync(SOURCE_FILE_PATH, UNICODE);
  let weatherDataInJson = WeatherParser.csvParser(weatherData, parse);
  let weatherDataInCsv = WeatherParser.jsonParser(weatherDataInJson, unparse);
  fs.writeFileSync(DESTINATION_FILE_PATH, weatherDataInCsv);
};

main();
