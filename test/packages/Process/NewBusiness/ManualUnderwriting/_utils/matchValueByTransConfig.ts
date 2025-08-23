import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import matchingRule from './matchingRule';

export const matchValue = ({
  mappingItem,
  targetParam,
  baseSourceFieldValue,
  baseSourceFieldValueByItem,
}: any) => {
  if (!lodash.isNil(baseSourceFieldValue)) {
    if (lodash.isEqual(baseSourceFieldValue, baseSourceFieldValueByItem)) {
      return lodash.get(mappingItem, targetParam);
    }
    return null;
  }
  return lodash.get(mappingItem, targetParam);
};

export default ({ key, path, item }: any) => {
  if (lodash.isString(path)) {
    const value = lodash.get(item, path);
    return value;
  }
  if (lodash.isPlainObject(path)) {
    const {
      baseSource,
      dataSoureType,
      matchRule,
      targetParam,
      notMatchRules,
    }: any = lodash.pick(path, [
      'baseSource',
      'dataSoureType',
      'matchRule',
      'targetParam',
      'notMatchRules',
    ]);
    if (dataSoureType === 'array') {
      if (matchRule) {
        if (!lodash.isArray(matchRule)) {
          const mappingItem = lodash
            .chain(item)
            .get(baseSource)
            .find((dataItem: any) => {
              return lodash.get(dataItem, matchRule?.paramKey) === matchRule?.paramValue;
            })
            .value();
          const value = matchValue({
            mappingItem,
            targetParam,
          });
          return value;
        }
        if (lodash.isArray(matchRule)) {
          if (lodash.get(path, 'dataDisplay') === 'matchMore') {
            const resultList: any = [];
            const ownBaseSource = lodash.get(item, baseSource);
            const sourceList = ownBaseSource;
            lodash.forEach(sourceList, (dataItem: any) => {
              if (
                lodash.every(matchRule, (rule: any) =>
                  matchingRule({
                    dataParamValue: formUtils.queryValue(lodash.get(dataItem, rule?.paramKey)),
                    ruleParamValue: rule?.paramValue,
                    ruleOperator: rule?.operator,
                  })
                )
              ) {
                const value = matchValue({
                  mappingItem: dataItem,
                  targetParam,
                });
                resultList.push(value);
              }
            });
            return resultList;
          }
          const mappingItem = lodash
            .chain(item)
            .get(baseSource)
            .find((dataItem: any) => {
              return lodash.every(matchRule, (rule: any) =>
                matchingRule({
                  dataParamValue: formUtils.queryValue(lodash.get(dataItem, rule?.paramKey)),
                  ruleParamValue: rule?.paramValue,
                  ruleOperator: rule?.operator,
                })
              );
            })
            .value();
          const value = matchValue({
            key,
            mappingItem,
            targetParam,
            baseSourceFieldValue:
              formUtils.queryValue(lodash.get(path, 'baseSourceFieldValue')) || null,
            baseSourceFieldValueByItem:
              formUtils.queryValue(lodash.get(item, lodash.get(path, 'baseSourceField'))) || null,
          });
          return value;
        }
      }
      if (notMatchRules) {
        const ownBaseSource = lodash
          .chain(item)
          .get(baseSource)
          .filter(
            (crt: any) =>
              !(
                lodash.chain(crt).get('ctfType').isNil().value() &&
                lodash.chain(crt).get('ctfExprieDate').isNil().value() &&
                lodash.chain(crt).get('ctfCountryCode').isNil().value()
              )
          )
          .value();
        const mappingItem = lodash
          .chain(ownBaseSource)
          .find((dataItem: any) => {
            return !lodash.some(notMatchRules, (rule) => {
              const sigleRuleNotMatch = lodash.every(rule, (ruleItem) => {
                const matchResult = matchingRule({
                  dataParamValue: formUtils.queryValue(lodash.get(dataItem, ruleItem?.paramKey)),
                  ruleOperator: ruleItem.operator,
                  ruleParamValue: ruleItem.paramValue,
                });
                return matchResult;
              });
              return sigleRuleNotMatch;
            });
          })
          .value();
        const value = matchValue({ mappingItem, targetParam });
        return value;
      }
    }
  }
};
