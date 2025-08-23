import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { EReasonStatus } from 'bpm/pages/Envoy/enum';


export default () => {
  const currentReasonGroups = useSelector(
    (state: any) => state.envoyController.currentReasonGroups,
    shallowEqual
  );
  const envoyBatchSendConfigs = useSelector(
    (state: any) => state.envoyController.envoyBatchSendConfigs,
    shallowEqual
  );
  return useMemo(() => {
    return lodash
      .chain(currentReasonGroups)
      .filter((resaonGroup: any) => {
        return (
          resaonGroup.status !== EReasonStatus.ACTIVE &&
          lodash.some(
            envoyBatchSendConfigs,
            (batchItem: any) => batchItem.reasonGroupCode === resaonGroup.groupCode
          )
        );
      })
      .value();
  }, [currentReasonGroups, envoyBatchSendConfigs]);
};
