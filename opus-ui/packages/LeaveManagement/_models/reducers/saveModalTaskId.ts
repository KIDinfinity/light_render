export default (state: any, action: any) => {
  const { modalTaskId } = action.payload;
  return {
    ...state,
    modalTaskId,
  };
};
