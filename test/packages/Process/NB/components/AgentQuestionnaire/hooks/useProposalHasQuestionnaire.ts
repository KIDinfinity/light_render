import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import AgentType from 'process/NB/Enum/AgentType';
import useLoadQuestionnaire from './useLoadQuestionnaire';
import lodash from 'lodash';
export default () => {
  const businessData = useSelector(({ manualUnderwriting }: any) => {
    return manualUnderwriting.businessData;
  }, shallowEqual);
  const applicationNo = businessData?.applicationNo;
  const agentList = lodash
    .chain(businessData?.agentList)
    .filter(
      (agent: any) =>
        agent.agentType === AgentType.Primary || agent.agentType === AgentType.Commission
    )
    .orderBy('agentType', 'desc')
    .value();

  useLoadQuestionnaire({ businessNo: applicationNo, agentData: agentList?.[0] || [] });
};
