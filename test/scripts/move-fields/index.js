const path = require('path');
const fs = require('fs');
const readline = require('readline');
const exec = require("child_process").exec;

const moveFields = async ({ basePath, targetPath }) => {
  const filePath = path.resolve(basePath, 'index.tsx')
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  for await(const line of rl ) {
    const reg = /('\.\/Fields\/)(\w*)(';)/;
    if (reg.test(line)) {
      const splitResult = line.split(reg);
      const fileName = `${splitResult[2]}.tsx`;
      console.log('fileName', fileName);
      const command = `mv ~/Downloads/${fileName} ${targetPath}`;
      console.log('command', command);
      exec(command, async (error, stdout) => {
        if (error) {
          console.log(error.stack);
          console.log("Error code: " + error.code);
          console.log("Signal received: " + error.signal);
      }});
      const configFileName = `${splitResult[2]}.config.ts`;
      const mvConfigFileCommand = `mv ~/Downloads/${configFileName} ${targetPath}`;
      exec(mvConfigFileCommand, async (error, stdout) => {
        if (error) {
          console.log(error.stack);
          console.log("Error code: " + error.code);
          console.log("Signal received: " + error.signal);
      }});
    }
  }
}
module.exports = { moveFields }
