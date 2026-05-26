import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { getNextTheme, resolveInitialTheme } from '../lib/theme';

test('uses a stored light theme before system preference', () => {
    assert.equal(resolveInitialTheme('light', true), 'light');
});

test('uses a stored dark theme before system preference', () => {
    assert.equal(resolveInitialTheme('dark', false), 'dark');
});

test('falls back to system dark preference without a stored theme', () => {
    assert.equal(resolveInitialTheme(null, true), 'dark');
});

test('falls back to light for invalid stored theme values', () => {
    assert.equal(resolveInitialTheme('system', false), 'light');
});

test('returns the opposite theme when toggled', () => {
    assert.equal(getNextTheme('light'), 'dark');
    assert.equal(getNextTheme('dark'), 'light');
});
