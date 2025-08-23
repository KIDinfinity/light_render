import { useMemo } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import lodash from 'lodash';
import AgentType from 'process/NB/Enum/AgentType';

export default () => {
  const agentList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.processData?.agentList,
    shallowEqual
  );
  const agentChannelCode = lodash
    .chain(agentList)
    .find((item) => item.agentType === AgentType.Primary)
    .get('agentChannelCode')
    .value();

  return useMemo(() => agentChannelCode, [agentChannelCode]);
};
