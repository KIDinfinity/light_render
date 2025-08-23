import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import useGetCampaignList from 'process/NB/ManualUnderwriting/_hooks/useGetCampaignList';
import AgentType from 'process/NB/Enum/AgentType';
import { NAMESPACE } from '../activity.config';
import { tenant, Region } from '@/components/Tenant';

export default () => {
  const campaignList = useGetCampaignList();
  const agentList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData.agentList,
    shallowEqual
  );
  return useMemo(() => {
    return lodash
      .chain(agentList)
      .filter(
        (agent: any) =>
          agent.agentType === AgentType.Primary || agent.agentType === AgentType.Commission
      )
      .orderBy('agentType', 'desc')
      .map((agent: any) => {
        const bankStaffRefName = lodash.get(agent, 'bankStaffRefName');
        const oldCampaignCode = lodash.get(agent, 'campaignCode');
        const crossSellingList = lodash.split(lodash.get(agent, 'crossSelling'), ',');
        const crossSelling = lodash.join(crossSellingList, ', ') || '';
        if (!lodash.isEmpty(oldCampaignCode)) {
          const campaignCode =
            (tenant.region() !== Region.VN &&
              lodash
                .chain(campaignList)
                .find((item: any) => item.dictCode === oldCampaignCode)
                .values()
                .join('-')
                .value()) ||
            oldCampaignCode;
          return { ...agent, campaignCode, crossSelling };
        }
        const bankStaffNo = (() => {
          if (!lodash.isEmpty(bankStaffNo)) {
            return lodash.get(agent, 'bankStaffNo') + '-' + bankStaffRefName;
          }
          return lodash.get(agent, 'bankStaffNo');
        })();
        return { ...agent, crossSelling };
      })
      .value();
  }, [agentList, campaignList]);
};
