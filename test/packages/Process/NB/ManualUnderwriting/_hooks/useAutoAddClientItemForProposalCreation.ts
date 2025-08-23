import { useEffect } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useAddClientDetail from 'process/NB/ManualUnderwriting/_hooks/useAddClientDetail';

export default () => {
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.businessData,
    shallowEqual
  );
  const handleAddClient = useAddClientDetail();
  return useEffect(() => {
    const clientListEmpty = lodash
      .chain(businessData)
      .get('policyList[0].clientInfoList', [])
      .isEmpty()
      .value();
    if (!lodash.isEmpty(businessData) && clientListEmpty) {
      handleAddClient();
    }
  }, [businessData, handleAddClient]);
};
