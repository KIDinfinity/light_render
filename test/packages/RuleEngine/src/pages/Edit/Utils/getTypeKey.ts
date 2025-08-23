import { AddType } from '../Enum';

export default (activeCode: string) => {
  let key = '';
  switch (activeCode) {
    case AddType.Results:
      key = 'resultRecordId';
      break;
    case AddType.Rules:
      key = 'ruleRecordId';
      break;
    case AddType.RuleSet:
      key = 'ruleSetId';
      break;
    case AddType.NewRuleSet:
      key = 'ruleSetId';
      break;
    case AddType.RuleSetBranch:
      key = 'conditionSetRecordId';
      break;
    default:
      key = 'conditionRecordId';
      break;
  }
  return key;
};
