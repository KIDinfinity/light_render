import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { cacluateComboRule } from 'basic/components/Form/Rule';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

// TODO:这里还没有处理
export default ({ conditionsConfig }: any) => {
  const coverageList =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.coverageList) || [];

  const condition = useMemo(() => {
    const domain = lodash.find(coverageList, (coverage) => {
      return coverage.isMain === 'Y';
    });
    return (() => {
      const targetCondionIndex = lodash
        .chain(conditionsConfig)
        .get('conditions', [])
        .findIndex((item) => {
          return lodash.chain(item).get('left.domain', '').isEqual('$basicProduct').value();
        })
        .value();

      const left = (() => {
        const leftConfig = lodash
          .chain(conditionsConfig)
          .cloneDeep()
          .get(`conditions[${targetCondionIndex}].left`, {})
          .set('domain', domain)
          .value();
        return formUtils.queryValue(lodash.get(leftConfig?.domain, leftConfig?.field));
      })();

      const conditions = lodash
        .chain(conditionsConfig)
        .get('conditions', [])
        .map((item: any, index: number) => {
          if (index === targetCondionIndex) {
            return {
              ...item,
              left,
            };
          }
          return item;
        })
        .value();
      return {
        ...conditionsConfig,
        conditions,
      };
    })();
  }, [coverageList]);
  return useMemo(() => {
    return cacluateComboRule(condition);
  }, [condition]);
};
