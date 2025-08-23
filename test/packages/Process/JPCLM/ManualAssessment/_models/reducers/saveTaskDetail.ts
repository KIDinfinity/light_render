const saveTaskDetail = (state: any, action: any) => {
  return {
    ...state,
    taskDetail: action.payload.taskDetail,
  };
};

export default saveTaskDetail;
