import { useSelector } from 'dva';
import lodash from 'lodash';

import { safeParse } from '@/utils/cache/utils';
import { caclculateSingleRule } from 'basic/components/Form/Rule';
import queryValue from 'basic/components/Form/formUtils/queryValue';

interface SelectorMap {
  payorSelector: string;
  productCategorySelector: string;
  insuredAgeSelector: string;
}

const selectorMap: SelectorMap = {
  payorSelector: 'processData.payorInfo.relationshipOfInsured',
  productCategorySelector: 'processData.productInfo.productCategory',
  insuredAgeSelector: 'processData.insuredInfo.age',
};

interface Config {
  visible: string;
  visibleCondition: string;
}

interface Condition {
  left: string;
  operator: string;
  right: any;
}

interface UseRuleParams {
  NAMESPACE: string;
  config: Config;
}

export default ({ NAMESPACE, config }: UseRuleParams) => {
  const { visible, visibleCondition } = config || {};
  const { combine, conditions } = safeParse(visibleCondition) || {};

  return useSelector(({ [NAMESPACE]: modelnamepsace }: any) => {
    if (visible === 'C') {
      if (combine === '&&') {
        return lodash.every(conditions, (item: Condition) => {
          const left = lodash.get(
            modelnamepsace,
            selectorMap?.[item?.left as keyof SelectorMap] || 'selectorPathNotFound',
            null
          );
          return caclculateSingleRule({
            left: queryValue(left),
            operator: item?.operator,
            right: item?.right,
          });
        });
      }
      if (combine === '||') {
        return lodash.some(conditions, (item: Condition) => {
          const left = lodash.get(
            modelnamepsace,
            selectorMap?.[item?.left as keyof SelectorMap] || 'selectorPathNotFound',
            null
          );
          return caclculateSingleRule({
            left: queryValue(left),
            operator: item?.operator,
            right: item?.right,
          });
        });
      }
    }
    return true;
  });
};
