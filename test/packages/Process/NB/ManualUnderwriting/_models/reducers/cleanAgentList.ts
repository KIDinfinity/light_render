import { produce }  from 'immer';
import lodash from 'lodash';
import AgentType from 'process/NB/Enum/AgentType';

export default (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    const index = lodash
      .chain(draftState)
      .findIndex((agent: any) => agent.agentType === AgentType.Primary)
      .value();
    if (index !== -1) {
      lodash.set(
        draftState,
        `businessData.angentList[${index}]`,
        lodash.omit(draftState.businessData.agentList[index], [
          'agencyCode',
          'agencyName',
          'agentEmail',
          'agentGivenName',
          'agentPhone',
        ])
      );
      lodash.set(draftState, 'businessData.branchCode', null);
    }
  });
  return { ...nextState };
};
