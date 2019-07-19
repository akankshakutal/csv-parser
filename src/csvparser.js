const { parseHeader } = require("./headerParser.js");
const COMMENT = "Comment";
const REASON = "Other";

class WeatherParser {
  isValidImpactorType(impactorType) {
    if (impactorType) return impactorType.toLowerCase() == "weather";
    return false;
  }

  isValidAmount(amount) {
    return !isNaN(parseInt(amount)) && amount != "0.00";
  }

  isValidObject(output) {
    return (
      this.isValidAmount(output.amount) &&
      this.isValidImpactorType(output.impactorType)
    );
  }

  getDivisionNumber(text) {
    return parseInt(text.split(" ")[0]);
  }

  createRequiredObject(key, weather) {
    let requiredObject = parseHeader(key);
    requiredObject.amount = weather[key];
    requiredObject.divisionNumber = this.getDivisionNumber(weather.unnamed);
    requiredObject.comment = COMMENT;
    requiredObject.reason = REASON;
    if (this.isValidObject(requiredObject)) return requiredObject;
    return;
  }

  removeEmptyKeys(element) {
    for (let key in element) {
      if (element[key]) delete element.key;
    }
    return element;
  }

  csvParser(weatherDataInCsv, parse) {
    const parsedWeatherData = parse(weatherDataInCsv, { header: true });
    return parsedWeatherData.data.map(weather => {
      const filterdData = this.removeEmptyKeys(weather);
      let keys = Object.keys(filterdData);
      keys.shift();
      return keys.map(key => {
        return this.createRequiredObject(key, filterdData);
      });
    });
  }

  jsonParser(weatherDataInJson, parse) {
    let result = [];
    weatherDataInJson.shift();
    result = result.concat(...weatherDataInJson).filter(element => element);
    return parse(result);
  }
}

module.exports = new WeatherParser();
