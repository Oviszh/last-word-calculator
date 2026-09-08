'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const filename = path.join(__dirname, 'last-word-calculator.html');
const html = fs.readFileSync(filename, 'utf8');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(/^<!DOCTYPE html>/i.test(html), 'Missing HTML doctype');
assert(/<title>[^<]+<\/title>/i.test(html), 'Missing page title');
assert(/<meta name="description" content="[^"]+">/i.test(html), 'Missing meta description');
assert(!/<script[^>]+src=/i.test(html), 'The offline tool must not load external scripts');
assert(!/\b(?:fetch|XMLHttpRequest|WebSocket|EventSource)\s*\(/.test(html), 'The offline tool must not make network requests');

const algorithmStart = html.indexOf('var WORDS = ');
const algorithmEnd = html.indexOf('/* ============ UI state ============ */');
assert(algorithmStart >= 0 && algorithmEnd > algorithmStart, 'Could not locate calculator algorithm');

const sandbox = { Uint8Array, Uint32Array, DataView };
vm.runInNewContext(html.slice(algorithmStart, algorithmEnd), sandbox);

assert(sandbox.WORDS.length === 2048, `Expected 2048 words, found ${sandbox.WORDS.length}`);
assert(new Set(sandbox.WORDS).size === 2048, 'BIP39 wordlist contains duplicates');

const zero128 = sandbox.lastWordCandidates(Array(11).fill('abandon'));
assert(zero128.cands.length === 128, '12-word mode should produce 128 candidates');
assert(zero128.cands.some(({ word }) => word === 'about'), 'Known 12-word BIP39 vector is missing');

const zero256 = sandbox.lastWordCandidates(Array(23).fill('abandon'));
assert(zero256.cands.length === 8, '24-word mode should produce 8 candidates');
assert(zero256.cands.some(({ word }) => word === 'art'), 'Known 24-word BIP39 vector is missing');

console.log('OK - self-contained HTML, wordlist, SHA-256, and BIP39 vectors verified.');

