interface IAction {
  payload: {
    customerType: string;
    businessCode: string;
  };
}

export default function saveCustomerType(state: any, { payload }: IAction) {
  const { customerType, businessCode } = payload;
  return {
    ...state,
    taskInfo: {
      ...state?.taskInfo,
      customerType,
      businessCode,
    },
  };
}
