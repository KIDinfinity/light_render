interface IPayload {
  payload: {
    preApprovalValue: string;
  };
}

export default (state: any, { payload }: IPayload) => {
  return {
    ...state,
    preApprovalValue: payload.preApprovalValue,
  };
};
