import { describe, expect, it } from 'vitest';

import { getErrorMessage, validateString } from './utils';

describe('validateString', () => {
	it('accepts a non-empty string within the limit', () => {
		expect(validateString('hello', 10)).toBe(true);
	});

	it('accepts a string exactly at the limit', () => {
		expect(validateString('abcde', 5)).toBe(true);
	});

	it('rejects a string over the limit', () => {
		expect(validateString('abcdef', 5)).toBe(false);
	});

	it('rejects an empty string', () => {
		expect(validateString('', 10)).toBe(false);
	});

	it.each([
		['null', null],
		['undefined', undefined],
		['a number', 42],
		['an object', {}],
		['a File-like value', new Blob(['x'])],
	])('rejects %s', (_label, value) => {
		expect(validateString(value, 10)).toBe(false);
	});
});

describe('getErrorMessage', () => {
	it('reads the message off an Error', () => {
		expect(getErrorMessage(new Error('boom'))).toBe('boom');
	});

	it('reads the message off a plain object', () => {
		expect(getErrorMessage({ message: 'from object' })).toBe('from object');
	});

	it('stringifies a non-string message', () => {
		expect(getErrorMessage({ message: 500 })).toBe('500');
	});

	it('falls back for a value with no message', () => {
		expect(getErrorMessage({ code: 'X' })).toBe('Something went wrong');
	});

	it('falls back for null', () => {
		expect(getErrorMessage(null)).toBe('Something went wrong');
	});

	it('returns a bare string as-is', () => {
		expect(getErrorMessage('just a string')).toBe('just a string');
	});

	it('falls back for an empty string', () => {
		expect(getErrorMessage('')).toBe('Something went wrong');
	});
});
