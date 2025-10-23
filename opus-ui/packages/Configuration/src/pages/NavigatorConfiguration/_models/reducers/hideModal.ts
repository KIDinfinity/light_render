export default (state: any, action: any) => {
  return {
    ...state,
    current: {},
    showModal: false,
    modalTaskId: '',
  };
};
