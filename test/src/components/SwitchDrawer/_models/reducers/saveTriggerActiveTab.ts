export default (state: any, { payload: { triggerActiveTab } }: any) => {
  return {
    ...state,
    triggerActiveTab,
  };
};
