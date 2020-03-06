const maskObject = require("./mask");

module.exports = function maskSensitiveFields(
  originalValue,
  sensitiveFields,
  maskBy
) {
  if (!originalValue) {
    return originalValue;
  }
  return Array.isArray(originalValue)
    ? originalValue.map(value =>
        maskObject(sensitiveFields, value, maskBy)
      )
    : maskObject(sensitiveFields, originalValue, maskBy);
};
