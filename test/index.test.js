const test = require('ava');
const maskSensitiveFields = require('../index');

test('should not mask given original value', t => {
	const notMasked = maskSensitiveFields("abcdefg", []);
	t.deepEqual(notMasked, "abcdefg");
});

test('should not mask given original array', t => {
	const notMasked = maskSensitiveFields(["abcdefg"], []);
	t.deepEqual(notMasked, ["abcdefg"]);
});

test('should not mask given no sensitive fields specified', t => {
	const notMasked = maskSensitiveFields({"name": "abc@gmail.com"}, []);
	t.deepEqual(notMasked, {"name": "abc@gmail.com"});
});

test('should mask with default dot given sensitive fields specified for single object', t => {
	const maskedObject = maskSensitiveFields({"name": "abc@gmail.com"}, ["name"]);
	t.deepEqual(maskedObject, {"name": "•••••••••.com"});
});

test('should mask with star given sensitive fields specified for single object', t => {
	const maskedObject = maskSensitiveFields({"name": "abc@gmail.com"}, ["name"], "*");
	t.deepEqual(maskedObject, {"name": "*********.com"});
});

test('should mask given sensitive fields specified for embeded object', t => {
	const maskedArray = maskSensitiveFields({"family": {"title": "大户人家", "name": "abc@gmail.com"}}, ["name"]);
	t.deepEqual(maskedArray, {"family": {"title": "大户人家", "name": "•••••••••.com"}});
});

test('should return null if target value is null', t => {
	const notMasked = maskSensitiveFields(null, []);
	t.deepEqual(notMasked, null);
});

test('should return undefined if target value is undefined', t => {
	const notMasked = maskSensitiveFields(undefined, []);
	t.deepEqual(notMasked, undefined);
});