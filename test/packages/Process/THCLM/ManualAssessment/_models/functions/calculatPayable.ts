import lodash from 'lodash';
import { add } from '@/utils/precisionUtils';
import { formUtils } from 'basic/components/Form';

import { mapForCalculat } from 'process/Utils/benefitCategoryUtils';

const reduceFields = [{ key: 'payableAmountBeforeDeductible', calculatField: 'payableAmount' }];

const doop = ({ claimEntities, childrenMap, item }: any): any => {
  const { children, mapKey, payableKey }: any = childrenMap || {};
  const childTargetId = item?.[payableKey];
  const childrenTarget = lodash.map(childTargetId, (id) => claimEntities?.[mapKey]?.[id]);

  if (children) {
    lodash.forEach(childrenTarget, (target, key) => {
      childrenTarget[key] = {
        ...target,
        ...doop({ claimEntities, childrenMap: children, item: target }),
      };
    });
  }

  const summaryFields = lodash.filter(reduceFields, (field) =>
    lodash.some(childrenTarget, (someItem) =>
      lodash.isNumber(formUtils.queryValue(someItem?.[field?.calculatField]))
    )
  );

  return lodash.reduce(
    childrenTarget,
    (result: any, reduceItem: any) => {
      lodash.forEach(reduceFields, (field) => {
        result[field.key] = lodash.includes(summaryFields, field)
          ? add(
              result?.[field.key] || 0,
              formUtils.queryValue(reduceItem?.[field?.calculatField]) || 0
            )
          : null;
      });
      return result;
    },
    {}
  );
};

export default ({ claimEntities, targetId = [] }: any) => {
  const target = lodash.isEmpty(targetId)
    ? claimEntities?.[mapForCalculat.mapKey]
    : lodash.map(targetId, (id) => claimEntities?.[mapForCalculat.mapKey]?.[id]);

  lodash.forEach(target, (item: any, key) => {
    const { benefitCategory } = item;
    const childrenMap = mapForCalculat.children?.[benefitCategory];
    const result = doop({ childrenMap, claimEntities, item });
    target[key] = { ...item, ...result };
  });
};
