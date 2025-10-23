export default (state: any, action: any) => {
  const { commonActionLife } = action.payload;
  state.commonActionLife = commonActionLife;
  return state;
};
