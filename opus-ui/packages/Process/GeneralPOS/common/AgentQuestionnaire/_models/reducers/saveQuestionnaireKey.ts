export default (state: any, { payload }: any) => {
  return {
    ...state,
    questionnaireKey: payload.questionnaireKey,
  };
};
