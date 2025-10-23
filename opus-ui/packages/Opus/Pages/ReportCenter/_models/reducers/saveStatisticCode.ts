export default (state: any, { payload }: any) => ({
  ...state,
  statisticCode: payload.statisticCode,
});
