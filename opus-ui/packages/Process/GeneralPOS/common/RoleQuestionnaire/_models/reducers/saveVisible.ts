export default (state: any, { payload }: any) => {
  return {
    ...state,
    visible: payload.visible,
  };
};
