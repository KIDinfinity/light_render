import { produce } from 'immer';

const saveLifeJClaim = (state: any, { payload }: any) => {
  const { klipCaseInfoList, incidentId } = payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.integration[incidentId] = {
      ...draftState.integration[incidentId],
      klipCaseInfoList,
    };
  });
  return { ...nextState };
};
export default saveLifeJClaim;
