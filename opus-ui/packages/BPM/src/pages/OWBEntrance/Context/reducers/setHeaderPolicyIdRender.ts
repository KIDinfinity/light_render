export default (state: any, action: any) => {
  const { headerPolicyIdRender } = action.payload;
  console.log('即将set的headerPolicyIdRender', headerPolicyIdRender);
  state.headerPolicyIdRender = headerPolicyIdRender;
  return state;
};
