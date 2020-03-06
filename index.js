const maskObject = require("./mask");

module.exports = function maskSensitiveFields(originalValue, sensitiveFields) {
  if (!originalValue) {
      return originalValue;
  }
  return Array.isArray(originalValue) ? originalValue.map(value => maskObject(sensitiveFields, value)) : maskObject(sensitiveFields, originalValue);
};
