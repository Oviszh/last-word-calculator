# BIP39 Last Word Calculator

A self-contained offline tool that calculates every valid final word for a 12-word or 24-word BIP39 mnemonic from the first 11 or 23 words.

## Use offline

Download `last-word-calculator.html`, disconnect from the network, and open the file in a browser. The file contains all CSS, JavaScript, cryptographic code, and wordlist data it needs.

The latest published file is always available at:

<https://github.com/Oviszh/last-word-calculator/releases/latest/download/last-word-calculator.html>

## Test

```bash
npm test
```

The test verifies the document structure, offline-only behavior, embedded wordlist, SHA-256 implementation, and known BIP39 vectors.

## Release

Push a stable version tag to publish a GitHub Release automatically:

```bash
git tag v1.0.0
git push origin v1.0.0
```

The release workflow tests the file and attaches it under the fixed name `last-word-calculator.html`. Sites may therefore consume the stable `releases/latest/download/...` URL without tracking version numbers.

MIT licensed. This software is provided without warranty; verify security-sensitive results independently.

