#!/usr/bin/env node

const { validate } = require("./eslint/validate")
const { validate: validateStyle } = require("./stylelint/validate");
const { grepChangeFile } = require('./utils/grepFiles');
const { addFiles } = require('./utils/addFiles');
const { format } = require('./prettier/format');

(async function main() {
  const files = await grepChangeFile(/\.tsx?$/);
  const styleFiles = await grepChangeFile(/\.less$/);
  await format({ files: files })
  await addFiles({ files: files })
  await validateStyle({ files: styleFiles });
  await addFiles({ files: styleFiles })
  await validate({ files })
})().catch((error) => {
  process.exitCode = 1;
  console.error('catch error',error);
});
