const { parseHeader } = require("./headerParser.js");
const COMMENT = "Comment";
const REASON = "Other";

const isValidImpactorType = function(impactorType) {
  if (impactorType) return impactorType.toLowerCase() == "weather";
  return false;
};

const isValidAmount = function(amount) {
  return !isNaN(parseInt(amount)) && amount != "0.00";
};

const isValidObject = function(output) {
  return (
    isValidAmount(output.amount) && isValidImpactorType(output.impactorType)
  );
};

const getDivisionNumber = function(text) {
  return parseInt(text.split(" ")[0]);
};

const createRequiredObject = function(key, newElement, element) {
  let output = parseHeader(key);
  output.amount = newElement[key];
  output.divisionNumber = getDivisionNumber(element.unnamed);
  output.comment = COMMENT;
  output.reason = REASON;
  if (isValidObject(output)) return output;
  return;
};

const removeEmptyKeys = function(element) {
  for (let key in element) {
    if (element[key] != "") delete element.key;
  }
  return element;
};

const parser = function(data) {
  return data.map(element => {
    let newElement = removeEmptyKeys(element);
    keys = Object.keys(newElement);
    keys.shift();
    return keys.map(key => {
      return createRequiredObject(key, newElement, element);
    });
  });
};

module.exports = { parser };
