// eslint rules: https://eslint.org/docs/rules/
const ruleJson = require('../../../eslint.rules.json');
const lodash = require('lodash');

const coreRules = [
  // Possible Errors
  'for-direction',
  'getter-return',
  'no-async-promise-executor',
  'no-compare-neg-zero',
  'no-cond-assign',
  'no-constant-condition',
  'no-control-regex',
  'no-debugger',
  'no-dupe-args',
  'no-dupe-else-if',
  'no-dupe-keys',
  'no-duplicate-case',
  'no-empty',
  'no-empty-character-class',
  'no-ex-assign',
  'no-extra-boolean-cast',
  'no-extra-semi',
  'no-func-assign',
  'no-import-assign',
  'no-inner-declarations',
  'no-invalid-regexp',
  'no-irregular-whitespace',
  'no-misleading-character-class',
  'no-obj-calls',
  'no-promise-executor-return',
  'no-prototype-builtins',
  'no-regex-spaces',
  'no-setter-return',
  'no-sparse-arrays',
  'no-unexpected-multiline',
  'no-unreachable',
  'no-unreachable-loop',
  'no-unsafe-finally',
  'no-unsafe-negation',
  'require-atomic-updates',
  'use-isnan',
  'valid-typeof',
  //variables
  'no-delete-var',
  'no-undef',
  'no-unused-vars',
];

describe('validate rules', () => {
  it('validate effective rules', () => {
    const rules = ruleJson.rules;
    lodash.forEach(coreRules, (rule) => {
      const item = rules[`@typescript-eslint/${rule}`] || rules[rule];
      console.log('rule', rule);
      console.log('ts item', rules[`@typescript-eslint/${rule}`]);
      console.log('item', rules[rule]);
      expect(item).toEqual(expect.not.arrayContaining(['warn']));
      expect(item).toEqual(expect.not.arrayContaining([1]));
      expect(item).toEqual(expect.not.arrayContaining([0]));
      expect(item).toEqual(expect.not.arrayContaining(['off']));
    });
  });
});
