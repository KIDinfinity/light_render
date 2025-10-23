export default (state: any, action: any) => {
  const { showMappingModal } = action.payload;
  return {
    ...state,
    showMappingModal,
  };
};
