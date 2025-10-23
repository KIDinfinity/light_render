
export default (state: any, { payload }: any) => {
  const processData = payload;

  return {
    ...state,
    processData,
  };
};
