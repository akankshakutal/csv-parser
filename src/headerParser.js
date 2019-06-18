const splitBySpace = function(text) {
  return text.split(" ");
};

const createTimePeriodObject = function(splitedValues) {
  let week = parseInt(splitedValues[0]);
  let periodNumber = parseInt(splitedValues[2]);
  let year = parseInt(splitedValues[3]);
  let impactorType = splitedValues[4];
  return { week, periodNumber, year, impactorType };
};

const parseHeader = function(headerText) {
  let splitedValues = splitBySpace(headerText);
  return createTimePeriodObject(splitedValues);
};

module.exports = { parseHeader };
