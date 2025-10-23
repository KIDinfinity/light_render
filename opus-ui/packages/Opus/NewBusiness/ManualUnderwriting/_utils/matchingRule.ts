import lodash from 'lodash';

export default ({ dataParamValue, ruleParamValue, ruleOperator }: any) => {
  switch (ruleOperator) {
    case 'includes':
      return lodash.includes(ruleParamValue, dataParamValue);
    case 'notIncludes':
      return !lodash.includes(ruleParamValue, dataParamValue);
    default:
      return false;
  }
};
