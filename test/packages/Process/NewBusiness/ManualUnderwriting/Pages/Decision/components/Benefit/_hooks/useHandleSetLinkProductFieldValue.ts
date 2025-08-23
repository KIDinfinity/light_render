import { useCallback } from 'react';
import { useDispatch } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import useGetCoverageList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageList';
import useGetProductionAndRider from 'decision/_hooks/useGetProductionAndRider';
import useGetNeedTriggerByCondtion from 'decision/components/Benefit/_hooks/useGetNeedTriggerByCondtion';

export default ({ coreCode, conditionFieldKey, conditionFieldValue }: any) => {
  const dispatch = useDispatch();
  const coverageList = useGetCoverageList('edit');
  const dicts = useGetProductionAndRider();
  const handleGetTrigger = useGetNeedTriggerByCondtion({ conditionFieldKey, conditionFieldValue });
  const set = new Set();
  return useCallback(
    ({ targetField, value }) => {
      lodash.map(coverageList, (item: any) => {
        if (formUtils.queryValue(item?.coreCode) !== formUtils.queryValue(coreCode)) {
          set.add(formUtils.queryValue(item?.coreCode));
        }
      });
      lodash.map(dicts, (dict: any) => {
        const needTrigger: boolean = handleGetTrigger(dict?.productCode);
        if (
          lodash.includes(Array.from(set), dict?.productCode) &&
          dict?.linkProductCode === formUtils.queryValue(coreCode) &&
          needTrigger
        ) {
          const list = lodash
            .chain(coverageList)
            .filter(
              (coverageItem: any) =>
                formUtils.queryValue(coverageItem?.coreCode) === dict?.productCode
            )
            .value();
          lodash.map(list, (item: any) => {
            dispatch({
              type: `${NAMESPACE}/setDecisionFieldData`,
              payload: {
                id: item?.id,
                changedFields: {
                  [targetField]: value,
                },
              },
            });
          });
        }
      });
      return set;
    },
    [coreCode, coverageList, dicts]
  );
};
