const CLIEngine = require("eslint").CLIEngine;
const path = require("path");
const { writeFile } = require("fs");
const lodash = require("lodash");
const prettier = require("prettier");
const format = (text) => {
  return prettier.format(text,
      {
        semi: false,
        parser: "json"
      }
  )
}

async function validateUnDef({ dictPaths }) {
  const cli = new CLIEngine({
    ingore: true,
    ingorePath: path.resolve(__dirname, "../../../.gitignore"),
    rules: {
      'no-undef': ['error']
    }
  })
  const report = cli.executeOnFiles(dictPaths);
  console.log('report', report);
  const reportPath = path.join(__dirname, './eslint-no-undef-report.json');
  const fullReportPath = path.resolve(__dirname, './eslint-full-report.json');
  const data = {
    ...report,
    results: report
    .results
    .filter(item => item.errorCount > 0)
    .filter(item => lodash.get(item, 'messages').find(ruleItem => lodash.includes(ruleItem.ruleId, 'no-undef')))
    .map(item => {
      const { source, ...others } = item;
      return {
        ...others,
        messages: lodash.chain(item).get('messages').filter(rule => lodash.get(rule, 'ruleId').includes('no-undef')).value(),
      }
    })
  }
  writeFile(reportPath,
    format(JSON.stringify(data)), 'utf8', () => {});
  writeFile(fullReportPath, format(JSON.stringify({
    ...report,
    results: report
    .results
    .filter(item => item.errorCount > 0)
    .map(item => {
      const { source, ...others } = item;
      return { ...others };
    })
  })), 'utf8', () => {});
};

module.exports = {
  validateUnDef
}
