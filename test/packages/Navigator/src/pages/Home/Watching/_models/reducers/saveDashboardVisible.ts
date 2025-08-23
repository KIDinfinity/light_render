/**
 * 保存Dashboard可视状态
 */
export default (state: any, action: any) => {
  const {
    payload: { dashboardHidden },
  } = action;
  return {
    ...state,
    dashboardHidden: Boolean(dashboardHidden),
  };
};
