const test = require('ava');
const maskObject = require('../mask');

test('should not mask given no sensitive fields specified', t => {
	const notMasked = maskObject([], {"name": "abc@gmail.com"});
	t.deepEqual(notMasked, {"name": "abc@gmail.com"});
});

test('should mask given sensitive fields specified for single object', t => {
	const maskedObject = maskObject(["name"], {"name": "abc@gmail.com"});
	t.deepEqual(maskedObject, {"name": "•••••••••.com"});
});

test('should mask given sensitive fields specified for embeded object', t => {
	const maskedArray = maskObject(["name"], {"family": {"title": "大户人家", "name": "abc@gmail.com"}});
	t.deepEqual(maskedArray, {"family": {"title": "大户人家", "name": "•••••••••.com"}});
});

test('should return null if target value is null', t => {
	const notMasked = maskObject(["name"], null);
	t.deepEqual(notMasked, null);
});

test('should return undefined if target value is undefined', t => {
	const notMasked = maskObject(["name"], undefined);
	t.deepEqual(notMasked, undefined);
});