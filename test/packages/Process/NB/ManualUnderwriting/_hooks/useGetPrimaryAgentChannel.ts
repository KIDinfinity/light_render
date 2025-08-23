import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import lodash from 'lodash';
import AgentType from 'process/NB/Enum/AgentType';
import DistributionChannelDisplayMethod from 'process/NB/Enum/DistributionChannelDisplayMethod';
import useGetDistributionChannelDisplayMethod from 'process/NB/ManualUnderwriting/_hooks/useGetDistributionChannelDisplayMethod';

export default () => {
  const displayMethod = useGetDistributionChannelDisplayMethod();
  const agentList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData?.agentList,
    shallowEqual
  );
  return useMemo(() => {
    const agent = lodash
      .chain(agentList)
      .find((item) => item.agentType === AgentType.Primary)
      .value();

    if (!agent) return '';

    const { agentChannelCode, sourceOfBusinessCode, agentSubChannelCode } = agent;
    const showCode = {
      [DistributionChannelDisplayMethod.BS]: sourceOfBusinessCode,
      [DistributionChannelDisplayMethod.AS]: agentSubChannelCode,
      [DistributionChannelDisplayMethod.AC]: agentChannelCode,
      [DistributionChannelDisplayMethod.ACS]: agentSubChannelCode || agentChannelCode,
    };
    return showCode[displayMethod as keyof typeof showCode] ?? '';
  }, [agentList, displayMethod]);
};
