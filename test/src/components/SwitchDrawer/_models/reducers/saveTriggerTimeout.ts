export default (state: any, { payload: { triggerTimeout } }: any) => {
  return {
    ...state,
    triggerTimeout,
  };
};
