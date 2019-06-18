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
      output.comment = "";
      output.reason = "something";
      if (isValidObject(output)) return output;
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

const isValidObject = function(object) {
  return (
    !isNaN(object["divisionNumber"]) &&
    !isNaN(object["week"]) &&
    !isNaN(object["periodNumber"]) &&
    !isNaN(object["year"]) &&
    isValidAmount(object["amount"]) &&
    isValidImpactorType(object["impactorType"])
  );
};

const isValidImpactorType = function(impactorType) {
  if (impactorType) return impactorType.toLowerCase() == "weather";
};

const isValidAmount = function(amount) {
    return !isNaN(parseInt(amount));
}

module.exports = { parser };
