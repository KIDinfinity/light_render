interface IAction {
  payload: {
    reasonCode: string;
    thPendPolicyReasons: any;
  };
}

export default (state: any, { payload }: IAction) => {
  const { reasonCode, thPendPolicyReasons } = payload;
  const { thPendPolicyReasonInfo } = state;
  return {
    ...state,
    thPendPolicyReasonInfo: {
      ...thPendPolicyReasonInfo,
      [reasonCode]: thPendPolicyReasons,
    },
  };
};
