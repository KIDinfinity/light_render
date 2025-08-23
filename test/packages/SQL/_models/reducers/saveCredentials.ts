export default (state, { payload }: any) => {
  const { username, password } = payload;
  return {
    ...state,
    gitAccount: { username, password },
  };
};
