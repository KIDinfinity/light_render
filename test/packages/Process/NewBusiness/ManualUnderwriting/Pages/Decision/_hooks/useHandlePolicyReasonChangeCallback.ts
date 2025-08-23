import { useCallback } from 'react';
import { useDispatch, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import useGetPreDefineDecision from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetPreDefineDecision';
import useGetPolicyStatus from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetPolicyStatus';
export default () => {
  const dispatch = useDispatch();
  const allReasonConfigList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.allReasonConfigList,
    shallowEqual
  );
  const policyStatus = useGetPolicyStatus();
  const preDefineDecision = useGetPreDefineDecision();
  return useCallback(
    (reason: any) => {
      let finalList = allReasonConfigList;
      if (lodash.isArray(finalList) && preDefineDecision && policyStatus) {
        finalList = finalList?.filter((item) => item?.reasonType === 'NT');
      } else if (lodash.isArray(finalList)) {
        finalList = finalList?.filter((item) => item?.reasonType !== 'NT');
      }
      const { reasonName, reasonDescription } = lodash
        .chain(finalList)
        .find((reasonItem) => reasonItem.reasonCode === reason)
        .pick(['reasonName', 'reasonDescription'])
        .value();
      dispatch({
        type: `${NAMESPACE}/setPolicySection`,
        payload: {
          changedFields: {
            reasonName,
            reasonDescription,
          },
        },
      });
    },
    [dispatch, allReasonConfigList]
  );
};
