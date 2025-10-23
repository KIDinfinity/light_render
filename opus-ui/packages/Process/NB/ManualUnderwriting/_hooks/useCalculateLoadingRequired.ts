import { useMemo } from 'react';
import lodash from 'lodash';
import { Required } from 'basic/components/Form';
import { cacluateComboRule } from 'basic/components/Form/Rule';
import useGetCoverageList from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageList';
import { formUtils } from 'basic/components/Form';

const transValue = ({ dataItem, valuePath }: any) => {
  return formUtils.queryValue(lodash.get(dataItem, valuePath?.field));
};
export default ({ config, coverageId, id }: any) => {
  const coverageList = useGetCoverageList();
  const configOfRequred = lodash.get(config, 'required');
  const requiredConditions = lodash.get(config, 'required-condition');
  const coverageItem = lodash
    .chain(coverageList)
    .find((item: any) => item?.id === coverageId)
    .get('coverageLoadingList', [])
    .find((item: any) => item?.id === id)
    .value();
  return useMemo(() => {
    if (configOfRequred === Required.Conditions) {
      const conditions = lodash
        .chain(requiredConditions)
        .get('conditions', [])
        .map((item: any) => {
          const left = transValue({
            dataItem: coverageItem,
            valuePath: item.left,
          });
          const right = transValue({
            dataItem: coverageItem,
            valuePath: item.right,
          });
          return {
            ...item,
            left,
            right,
          };
        })
        .value();
      const combine = lodash.get(requiredConditions, 'combine');
      const result = cacluateComboRule({ conditions, combine });
      return result;
    }
    return configOfRequred === Required.Yes;
  }, [configOfRequred, requiredConditions, coverageItem]);
};
