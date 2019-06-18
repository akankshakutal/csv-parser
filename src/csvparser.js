const { parseHeader } = require("./headerParser.js");

const parser = function(data) {
  return data.map(element => {
    let newElement = removeEmptyKeys(element);
    keys = Object.keys(newElement);
    keys.shift();
    return keys.map(key => {
      let output = parseHeader(key);
      output.amount = newElement[key];
      output.divisionNumber = getDivisionNumber(element["unnamed"]);
      output.comment = "system entered";
      output.reason = "other";
      if (isValidAmount(output.amount) && isValidImpactorType(output.impactorType)) return output;
      return;
    });
  });
};

const removeEmptyKeys = function(element) {
  for (let key in element) {
    if (element[key] != "") delete element.key;
  }
  return element;
};

const getDivisionNumber = function(text) {
  return parseInt(text.split(" ")[0]);
};

const isValidImpactorType = function(impactorType) {
  if (impactorType) return impactorType.toLowerCase() == "weather";
  return false;
};

const isValidAmount = function(amount) {
  return !isNaN(parseInt(amount)) && amount != "0.00";
};

module.exports = { parser };
