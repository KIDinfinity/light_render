// eslint-disable-next-line import/no-unresolved
require('reflect-metadata');

global.Buffer = require('buffer').Buffer;
Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype);
Object.setPrototypeOf(Buffer, Uint8Array);
