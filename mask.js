"use strict";

function mask(source, maskBy) {
  if (!source) {
    return source;
  }
  const maskByCharacter = maskBy ? maskBy.toString() : "•";
  const stringSource = source.toString();
  const maskLength = stringSource.length - 4;
  return stringSource.replace(
    stringSource.substring(0, maskLength),
    maskByCharacter.repeat(maskLength)
  );
}

module.exports = function maskObject(sensitiveFields, target, maskBy) {
  const isOriginalValue = target === null || !(typeof target === "object");
  if (isOriginalValue) {
    return target;
  }
  return Object.keys(target).reduce((acc, key) => {
    const targetValue = target[key];
    const isObjectOrArray =
      targetValue !== null && typeof targetValue === "object";
    if (isObjectOrArray) {
      return Object.assign(Object.assign({}, acc), {
        [key]: Array.isArray(targetValue)
          ? targetValue.map(value => maskObject(sensitiveFields, value))
          : maskObject(sensitiveFields, targetValue)
      });
    } else {
      if (sensitiveFields.includes(key)) {
        return Object.assign(Object.assign({}, acc), {
          [key]: mask(target[key], maskBy)
        });
      }
      return Object.assign(Object.assign({}, acc), { [key]: target[key] });
    }
  }, {});
};
