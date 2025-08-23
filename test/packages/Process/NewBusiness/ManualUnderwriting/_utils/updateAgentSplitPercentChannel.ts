import lodash from 'lodash';
import { tenant, Region } from '@/components/Tenant';
import type AgentType from 'process/NewBusiness/Enum/AgentType';
// for Distribution Channel
// include isLast is true
export default (
  agentListMap: Record<
    string,
    { id: string; isLast?: boolean; agentType: AgentType; commissionSplitPercent?: number }
  >
) => {
  // exclude last empty line
  const agentsLength = Object.values(agentListMap).filter((agent) => !agent?.isLast).length;
  return lodash.reduce<any, { id: string; commissionSplitPercent: number }[]>(
    Object.values(agentListMap),
    (prev, cur) => {
      if (!cur?.isLast && tenant.region() === Region.TH) {
        if (agentsLength === 2) {
          return [...prev, { id: cur.id, commissionSplitPercent: 50 }];
        } else if (agentsLength === 1) {
          return [...prev, { id: cur.id, commissionSplitPercent: 100 }];
        }
      }
      return prev;
    },
    []
  );
};
