const fs = require('fs');
const { formatDirFiles } = require('../helper/formatDirFiles')
const { open } = require('fs/promises');
// const { formatFileContent } = require('./formatFileContent');
const { formatFileContent } = require('../helper/formatFileContent')

const emptyConditionReg = /\s+'((editable)|(required)|(visible))-condition'\B:\s+\{\s+combine:\s+'\|\|',\s+conditions:\s+\[\{\s+left:\s+\{\s+domain:\s+'',\s+field:\s+''\s+\},\s+operator:\s+'',\s+right:\s+''\s+\}\],\s+\},/;

const remvoeEmptyConditionConfig = ({ dictPath }) => {
  formatDirFiles({
    dictPath,
    fileFilter: (filePath) => /.config.ts$/.test(filePath),
    format: async (filePath) => {
      const fileHandler = await open(filePath, 'r');
      const content = await fileHandler.readFile('utf-8');
      console.log(content, 'content');

      const text = content.replace(emptyConditionReg, '');

      fileHandler.close();

      const writHandler = await open(filePath, 'w');
      await writHandler.writeFile(text, 'utf-8');
      writHandler.close();
      // const fileStream =  fs.createReadStream(filePath);

      // const content =  fileStream.readFile();
      // console.log(content, 'content')
      // return formatFileContent(filePath, text => {
      //   console.log(text, 'text')
      //   return text.replace(emptyConditionReg, '')
      // })
    }
  })
}

module.exports = {
  emptyConditionReg,
  remvoeEmptyConditionConfig
}



