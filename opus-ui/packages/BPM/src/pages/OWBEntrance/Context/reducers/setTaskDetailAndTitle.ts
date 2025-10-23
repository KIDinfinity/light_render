export default (state: any, action: any) => {
  const { title, taskDetail } = action.payload;
  state.title = title;
  state.taskDetail = taskDetail;
  return state;
};
