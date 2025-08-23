import { produce } from 'immer';

export default (state: any, action: any) => {
  const { beneficiaryInfo } = action.payload;
  return produce(state, (draftState: any) => {
    const companyName = beneficiaryInfo?.companyName || '';
    if (draftState.fillInPayeeId) {
      if (draftState.claimEntities.payeeListMap?.[draftState.fillInPayeeId]) {
        draftState.claimEntities.payeeListMap[draftState.fillInPayeeId] = {
          ...state.claimEntities.payeeListMap?.[draftState.fillInPayeeId],
          ...beneficiaryInfo,
        };
      }
    } else {
      const claimant = draftState.claimProcessData.claimant;
      draftState.claimProcessData.claimant = {
        ...claimant,
        ...beneficiaryInfo,
        originCompanyName: companyName || '',
      };
    }
  });
};
