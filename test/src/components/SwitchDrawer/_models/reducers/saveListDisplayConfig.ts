export default (state: any, { payload: { listDisplayConfig } }: any) => {
  return {
    ...state,
    listDisplayConfig,
  };
};
