export default (state: any, action: any) => {
  const {
    payload: { statusFilter },
  } = action;

  return {
    ...state,
    statusFilter,
  };
};
