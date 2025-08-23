import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import useGetCampaignList from 'process/NB/ManualUnderwriting/_hooks/useGetCampaignList';
import AgentType from 'process/NB/Enum/AgentType';
import { NAMESPACE } from '../activity.config';

export default () => {
  const campaignList = useGetCampaignList();
  const agentList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.agentData,
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
        const oldCampaignCode = lodash.get(agent, 'campaignCode');
        const crossSellingList = lodash.map(
          lodash.split(lodash.get(agent, 'crossSelling'), ','),
          (e) => {
            return formatMessageApi({
              Dropdown_COM_CrossSelling: e,
            });
          }
        );
        const crossSelling = lodash.join(crossSellingList, ', ') || '';
        if (!lodash.isEmpty(oldCampaignCode)) {
          const campaignCode =
            lodash
              .chain(campaignList)
              .find((item: any) => item.dictCode === oldCampaignCode)
              .values()
              .join('-')
              .value() || oldCampaignCode;
          return { ...agent, campaignCode, crossSelling };
        }
        return { ...agent, crossSelling };
      })
      .value();
  }, [agentList]);
};
