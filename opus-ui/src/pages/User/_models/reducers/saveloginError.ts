export default (state: any, { payload }: any) => {
  const { loginError } = payload;

  return {
    ...state,
    loginError,
  };
};
