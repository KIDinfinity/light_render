import { produce } from 'immer';

export default (state: any, { payload }: any) => {
  const { visible = false, left = 0, top = 0, incidentId }: any = payload;
  return produce(state, draft => {
    draft.adjustmentFactorState[incidentId] = {
      visible,
      left,
      top,
    };
  })
};
