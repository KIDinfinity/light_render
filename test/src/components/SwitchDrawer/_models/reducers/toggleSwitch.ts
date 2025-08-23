// TODO:到时统一用这个方法，把上面两个去掉
export default (state: any, action: any) => {
  return {
    ...state,
    ...action.payload,
  };
};
