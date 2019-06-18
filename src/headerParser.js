const splitBySpace = function(text, delimiter) {
  return text.split(delimiter);
};

const createTimePeriodObject = function(splitedValues) {
  let week = parseInt(splitedValues[0]);
  let periodNumber = parseInt(splitedValues[2]);
  let mayBeYear = parseInt(splitedValues[3]);
  let year = isNaN(mayBeYear) ? null : mayBeYear;
  let impactorType = splitedValues[4];
  return { week, periodNumber, year, impactorType };
};

const parseHeader = function(headerText) {
  return createTimePeriodObject(splitBySpace(headerText, " "));
};

module.exports = { parseHeader };
