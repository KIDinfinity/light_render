export default (state: any, action: any) => {
  const { resetLoading } = action.payload;
  return {
    ...state,
    resetLoading,
  };
};
