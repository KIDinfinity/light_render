import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector,  useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import { tenant, Region } from '@/components/Tenant';
import AgentType from 'process/NB/Enum/AgentType';
import useExistEntityPolicyOwner from 'process/NB/ManualUnderwriting/_hooks/useExistEntityPolicyOwner';
import { NAMESPACE } from '../activity.config';

export default () => {
  const dispatch = useDispatch();
  const regionCode = tenant.region();
  const agentList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData?.agentList,
    shallowEqual
  );
  const agentChannelCode = lodash
    .chain(agentList)
    .find((agent: any) => agent.agentType === AgentType.Primary)
    .get('agentChannelCode')
    .value();
  const isAgency =
    agentChannelCode === 'Agency' || agentChannelCode === 'AG' || agentChannelCode === 'AGENCY';
  const existEntityPolicyOwner = useExistEntityPolicyOwner();
  return useMemo(() => {
    return existEntityPolicyOwner && isAgency && regionCode === Region.PH;
  }, [existEntityPolicyOwner, isAgency, dispatch, regionCode]);
};
