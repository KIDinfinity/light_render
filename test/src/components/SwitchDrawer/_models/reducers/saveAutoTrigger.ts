export default (state: any, { payload: { autoTrigger } }: any) => {
  return {
    ...state,
    autoTrigger,
  };
};
