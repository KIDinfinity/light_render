export default (state: any, action: any) => {
  const {
    payload: { statusFilterList },
  } = action;

  return {
    ...state,
    statusFilterList,
  };
};
