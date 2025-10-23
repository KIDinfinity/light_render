export default (state: any, action: any) => {
  const { taskLoading } = action.payload;
  return {
    ...state,
    taskLoading,
  };
};
