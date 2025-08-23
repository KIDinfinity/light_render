import { produce } from 'immer';

export default (state: any, action: any) => {
  const { beneficiaryInfo } = action.payload;
  return produce(state, (draftState: any) => {
    const claimant = draftState.claimProcessData.claimant;
    draftState.claimProcessData.claimant = {
      ...claimant,
      ...beneficiaryInfo,
      originCompanyName: beneficiaryInfo?.companyName || '',
    };
  });
};
