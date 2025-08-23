export default (state: any, { payload: { taskDetail } }: any) => {
  return {
    ...state,
    taskDetail,
  };
};
