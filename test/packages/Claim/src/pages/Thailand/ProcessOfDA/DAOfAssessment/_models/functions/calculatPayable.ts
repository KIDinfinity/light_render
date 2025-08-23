import lodash from 'lodash';
import { add } from '@/utils/precisionUtils';
import { formUtils } from 'basic/components/Form';
import { BenefitCategoryEnum } from 'process/Utils/benefitCategoryUtils';
import { mapForCalculat } from 'process/Utils/benefitCategoryUtils';

const reduceFields = ['payableAmountBeforeDeductible'];

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
      lodash.isNumber(formUtils.queryValue(someItem?.[field]))
    )
  );

  return lodash.reduce(
    childrenTarget,
    (result: any, reduceItem: any) => {
      lodash.forEach(reduceFields, (field) => {
        result[field] = lodash.includes(summaryFields, field)
          ? add(result?.[field] || 0, formUtils.queryValue(reduceItem?.[field]) || 0)
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
    const newBenefitCategory =
      benefitCategory === BenefitCategoryEnum.Reimbursement
        ? BenefitCategoryEnum.OldReimbursement
        : benefitCategory;
    const childrenMap = mapForCalculat.children?.[newBenefitCategory];
    const result = doop({ childrenMap, claimEntities, item });
    target[key] = { ...item, ...result };
  });
};
