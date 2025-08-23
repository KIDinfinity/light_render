const stylelint = require('stylelint');
const lodash = require('lodash');

async function validate({ files }) {
  console.log('valiate style files', files);
  if (lodash.isEmpty(files)) {
    return false;
  }
  await stylelint.lint({
    files,
    fix: true
  }).then(result => {
    // console.log('result:', result)
    if (result.errored) {
      // console.log(result)
      const output = result.output;
      // const errorItem = JSON.parse(output)
      const errorItems = result.results.filter(item => item.errored)
      throw new Error(JSON.stringify(errorItems));
    }
  })
}

module.exports = { validate };
