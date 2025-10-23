import lodash from 'lodash';
import { cacluateComboRule } from 'basic/components/Form/Rule';

const getLeftByParamKey = ({ pathData, paramKey }: any) => {
  return lodash.get(pathData, paramKey);
};

const ruleRequestFn = (ruleRequest) => {
  if (ruleRequest) {
    return {
      left: true,
      operator: '===',
      right: true,
    };
  } else {
    return {
      left: false,
      operator: '===',
      right: true,
    };
  }
};

const getCondition = ({ combine, conditions, data, dataPath, condition }: any) => {
  if (!lodash.isEmpty(conditions)) {
    if (lodash.includes(dataPath, '[]')) {
      const subData = lodash.get(data, lodash.replace(dataPath, '[]', ''));
      const conditionRequest = lodash.map(subData, (subDataItem: any) => {
        const subConditionsRequest = lodash.map(conditions, (conditionItem) => {
          const subCombine = lodash.get(condition, 'combine');
          const subConditions = lodash.get(conditionItem, 'conditions');
          const subDataPath = lodash.get(conditionItem, 'dataPath');
          return getCondition({
            combine: subCombine,
            conditions: subConditions,
            data: subDataItem,
            dataPath: subDataPath,
            condition: conditionItem,
          });
        });
        const ruleRequest = cacluateComboRule({
          combine,
          conditions: subConditionsRequest,
        });
        return ruleRequestFn(ruleRequest);
      });
      if (!lodash.isEmpty(conditionRequest)) {
        const ruleRequest = cacluateComboRule({ combine: '||', conditions: conditionRequest });
        return ruleRequestFn(ruleRequest);
      } else {
        return false;
      }
    } else {
      const subConditionsRequest = lodash.map(conditions, (conditionItem) => {
        const subCombine = lodash.get(conditionItem, 'combine');
        const subConditions = lodash.get(conditionItem, 'conditions');
        const subDataPath = lodash.get(conditionItem, 'dataPath');

        return getCondition({
          combine: subCombine,
          conditions: subConditions,
          data,
          dataPath: subDataPath,
          condition: conditionItem,
        });
      });
      const ruleRequest = cacluateComboRule({
        combine,
        conditions: subConditionsRequest,
      });
      return ruleRequestFn(ruleRequest);
    }
  } else {
    const paramKey = lodash.get(condition, 'left.paramKey');
    return { ...condition, left: getLeftByParamKey({ pathData: data, paramKey }) };
  }
};
export default ({ visibleCondition, data }: any) => {
  const { combine, conditions, dataPath } = lodash.pick(visibleCondition, [
    'combine',
    'conditions',
    'dataPath',
  ]);
  const conditionRequest = getCondition({ combine, conditions, data, dataPath });
  if (!lodash.isEmpty(conditionRequest)) {
    return cacluateComboRule({ combine: '||', conditions: [conditionRequest] }) ? 'Y' : 'N';
  } else {
    return 'N';
  }
};
