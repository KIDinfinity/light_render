const { readFile, writeFile } = require('fs/promises')
const { formatDirFiles } = require('../../helper/formatDirFiles');
const { filterLessFile } = require('./filterLessFile');
const { colorBizVarNameRule } = require('./colorBizVarNameRule');
const { updateColorBizCollection } = require('./updateColorBizCollection');
const { colorReg, classBlockReg, colorValueReg } = require('./reg');

const colorBizVarCollect = async ({
  dictPath,
  collectionFile,
}) => {
  await formatDirFiles({
    fileFilter: filterLessFile,
    dictPath,
    format: async (path) =>  {
      console.log('path', path);
      const fileContent = await readFile(path, 'utf8');
      // console.log('file content', fileContent);
      let result = fileContent;

      const formatContent = async (text) => {
        // const reg = /(\.[a-z|A-Z]{1,})(\s\{\n(.|\n){1,})/g;
        if (classBlockReg.test(text)) {
          console.log('text', text);
          const all = text.matchAll(new RegExp(classBlockReg, 'g'));
          for (const m of all) {
            console.log('m', m)
            for (const t of m) {
              if (classBlockReg.test(t)) {
                if (colorReg.test(t)) {
                console.log('tttt', t)
                  const codeSplited = t.split(colorReg);
                  console.log('code split', codeSplited);
                  const addBizVarName = colorBizVarNameRule({
                    codeSplited,
                    path,
                    originFileContent: fileContent,
                  });
                  console.log('addBizVarName', addBizVarName)
                  await updateColorBizCollection({
                    collectionFile,
                    change: addBizVarName.change,
                    path
                  })
                  const after = addBizVarName.content.join('');
                  console.log('after', after);
                  result = result.replace(t, after);
                  if (classBlockReg.test(result)) {
                    // await formatContent(result);
                  }
                } else {
                  console.warn('color test not pass', t);
                  console.log('colorReg.test(t)', colorReg.test('border: solid 1px @white-15;'));
                  console.log('colorValueReg.test(t)', colorValueReg.test(t));
                }
              }
            }
          }
        } else {
          console.error('text not pass', text);
        }
      };

      await formatContent(fileContent);
      await writeFile(path, result)
    }
  })

}


module.exports = { colorBizVarCollect };
