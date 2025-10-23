import saveTaskLoading from './saveTaskLoading';

export default (state: any, action: any) => {
  const { modalTaskId, isPreview } = action.payload;
  const newState = saveTaskLoading(state, {
    type: 'saveTaskLoading',
    payload: {
      taskLoading: true,
    },
  });
  return {
    ...newState,
    showModal: true,
    modalTaskId,
    isPreview,
  };
};
