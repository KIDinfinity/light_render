export default (state: any, action: any) => {
  const {
    payload: { mode },
  } = action;

  return {
    ...state,
    mode,
  };
};
