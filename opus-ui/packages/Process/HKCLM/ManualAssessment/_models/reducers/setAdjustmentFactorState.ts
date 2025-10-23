export default (state: any, { payload }: any) => {
  const { visible = false, left = 0, top = 0, incidentId }: any = payload;
  state.adjustmentFactorState[incidentId] = {
    visible,
    left,
    top,
  };
  return state;
};
