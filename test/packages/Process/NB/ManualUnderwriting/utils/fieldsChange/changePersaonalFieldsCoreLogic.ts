import lodash from 'lodash';
import { produce }  from 'immer';
import { formUtils } from 'basic/components/Form';
import { transConfig } from 'process/NB/ManualUnderwriting/_hooks/data.trans.config';

export default ({ changedFields, id, businessData }: any) => {
  const nextState = produce(businessData, (draftState: any) => {
    if (lodash.size(changedFields) === 1) {
      lodash
        .chain(transConfig)
        .entries()
        .forEach(([key, path]: any) => {
          if (
            key === lodash.chain(changedFields).keys().first().value() &&
            lodash.isArray(path?.matchRule) &&
            lodash.find(
              path?.matchRule,
              (rule: any) =>
                rule?.paramKey === 'ctfType' &&
                lodash.isArray(rule?.paramValue) &&
                rule?.paramValue?.length > 1
            )
          ) {
            const dataSource = lodash
              .chain(businessData)
              .get('policyList[0].clientInfoList', [])
              .find((item: any) => item?.id === id)
              .get(`${path?.baseSource}`)
              .value();
            const index = lodash
              .chain(businessData)
              .get('policyList[0].clientInfoList')
              .findIndex((item: any) => item?.id === id)
              .value();
            const dataItemIndex = (() => {
              return lodash.findIndex(dataSource, (dataItem: any) => {
                return lodash.every(path?.matchRule, (rule) => {
                  if (rule.operator === 'includes') {
                    return lodash.includes(
                      rule?.paramValue,
                      formUtils.queryValue(lodash.get(dataItem, rule?.paramKey))
                    );
                  }
                  return !lodash.includes(
                    rule?.paramValue,
                    formUtils.queryValue(lodash.get(dataItem, rule?.paramKey))
                  );
                });
              });
            })();
            lodash.set(
              draftState,
              `policyList[0].clientInfoList.[${index}].${path?.baseSource}.[${dataItemIndex}].${path?.targetParam}`,
              formUtils.queryValue(changedFields[`${key}`])
            );
          }
        })
        .value();
    }
  });

  return {
    ...nextState,
  };
};
