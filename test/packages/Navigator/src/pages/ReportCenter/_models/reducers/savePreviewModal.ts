export default (state: any, action: any) => {
  return {
    ...state,
    previewModal: action.payload.visible,
  };
};
