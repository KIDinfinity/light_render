export default (state: any, action: any) => {
  const { questionnaires } = action.payload;
  return {
    ...state,
    questionnaires,
  };
};
