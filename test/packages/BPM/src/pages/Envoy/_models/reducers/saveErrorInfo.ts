interface IAction {
  payload: {
    errorInfo: any
  }
}

export default function (state: any, { payload }: IAction) {
  const { errorInfo } = payload
  return {
    ...state,
    errorInfo,
  }
};
