import { produce } from 'immer';

const savePlanProductConfig = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.planProductConfig = action?.payload?.planProductConfig;
  });

  return { ...nextState };
};

export default savePlanProductConfig;
