export default (state: any, action: any) => {
  const { showModal } = action.payload;
  return {
    ...state,
    showModal,
  };
};
