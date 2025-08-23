const fs = require('fs');
const readline = require('readline');

const formatFileContent = async (filePath, transFunc) => {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  const array = [];
  for await(const line of rl ) {
    const result = transFunc(line);
    array.push(result);
  }
  const writeStream = fs.createWriteStream(filePath);
  array.forEach(line => {
    writeStream.write(`${line}\n`);
  })
  writeStream.end();
}

module.exports = { formatFileContent }
