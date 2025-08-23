import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { tenant, Region } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';
import AgentType from 'process/NewBusiness/Enum/AgentType';

import CustomerRole from 'process/NB/Enum/CustomerRole';
import CustomerTypeEnum from 'process/NB/ManualUnderwriting/Enum/CustomerTypeEnum';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default () => {
  const regionCode = tenant.region();
  const clientInfoList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.clientInfoList
  );

  const agentList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.agentList,
    shallowEqual
  );

  const agentChannelCode = lodash
    .chain(agentList)
    .find(({ agentType }: any) => agentType === AgentType.Primary)
    .get('agentChannelCode')
    .value();

  const existEntityPolicyOwner = lodash
    .chain(clientInfoList)
    .find(({ customerType = '', roleList = [] }: any) => {
      const isPolicyOwner = lodash
        .chain(roleList)
        .map(({ customerRole }: any) => customerRole)
        .includes(CustomerRole.PolicyOwner)
        .value();
      return (
        formUtils.queryValue(customerType) === CustomerTypeEnum?.Company &&
        isPolicyOwner &&
        regionCode === Region.PH
      );
    })
    .value();

  return useMemo(() => {
    return (
      existEntityPolicyOwner &&
      (agentChannelCode === 'Agency' ||
        agentChannelCode === 'AG' ||
        agentChannelCode === 'AGENCY') &&
      regionCode === Region.PH
    );
  }, [existEntityPolicyOwner, agentChannelCode]);
};
