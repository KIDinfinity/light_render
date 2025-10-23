import { AddType } from '../../Enum';
import getRules from './getRules';
import getCondition from './getCondition';
import getRusult from './getRusult';
import getRuleSet from './getRuleSet';
import getRuleSetBranch from './getRuleSetBranch';

export default ({ activeCode, params, onSearchChange }: any) => {
  let columnArr = null;

  switch (activeCode) {
    case AddType.Rules:
      columnArr = getRules({ onSearchChange, params });
      break;
    case AddType.Results:
      columnArr = getRusult({ onSearchChange, params });
      break;
    case AddType.RuleSet:
      columnArr = getRuleSet({ onSearchChange, params });
      break;
    case AddType.RuleSetBranch:
      columnArr = getRuleSetBranch({ onSearchChange, params });
      break;
    default:
      columnArr = getCondition({ onSearchChange, params });
      break;
  }

  return columnArr;
};
