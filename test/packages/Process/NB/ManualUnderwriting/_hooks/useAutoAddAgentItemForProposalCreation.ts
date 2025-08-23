import { useEffect } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useHandleAddAgentCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleAddAgentCallback';

export default () => {
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.businessData,
    shallowEqual
  );
  const handleAddAgent = useHandleAddAgentCallback();
  return useEffect(() => {
    const agentListEmpty = lodash.chain(businessData).get('agentList', []).isEmpty().value();

    if (!lodash.isEmpty(businessData) && agentListEmpty) {
      handleAddAgent();
    }
  }, [businessData, handleAddAgent]);
};
