export default (state: any, { payload }: any) => {
  const { batchSumUpStatistic } = payload;
  return {
    ...state,
    batchSumUpStatistic,
  };
};
