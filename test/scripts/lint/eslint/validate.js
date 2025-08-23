
const { ESLint } = require("eslint");
const lodash = require("lodash");

async function validate({ files }) {
  if (lodash.isEmpty(files)) {
    return false;
  }
  const eslint = new ESLint({
    cache: true,
  });
  console.log('file list here', files);
  const results = await eslint.lintFiles(files);
  const formatter = await eslint.loadFormatter("stylish");
  const resultText = formatter.format(results);
  console.error(resultText);
  const counting = lodash.reduce(results, ((result,  item) => {
    return result + item.errorCount
  }), 0);
  console.log(`total ${counting} eslint errors`);
  if (counting > 0) {
    throw new Error('eslint validate fail');
  }
}

module.exports = {
  validate
}
