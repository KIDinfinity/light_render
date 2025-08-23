const setPolicyInfo = (state: any, action: any) => {
  return {
    ...state,
    policyInfo: action?.payload?.policyInfo,
  };
};

export default setPolicyInfo;
