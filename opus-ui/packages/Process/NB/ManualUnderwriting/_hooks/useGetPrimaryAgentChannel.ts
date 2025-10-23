import { useMemo } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import lodash from 'lodash';
import AgentType from 'process/NB/Enum/AgentType';

export default () => {
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData,
    shallowEqual
  );
  return useMemo(() => {
    return lodash
      .chain(businessData)
      .get('agentList', [])
      .find((item) => item.agentType === AgentType.Primary)
      .get('agentChannelCode')
      .value();
  }, [businessData]);
};
