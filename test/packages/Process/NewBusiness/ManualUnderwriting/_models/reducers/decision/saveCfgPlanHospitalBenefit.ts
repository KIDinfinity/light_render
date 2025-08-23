import { produce } from 'immer';

export default (state: any, action: any) => {
  const { cfgPlanHospitalBenefits } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.cfgPlanHospitalBenefits = cfgPlanHospitalBenefits;
  });
  return { ...nextState };
};
