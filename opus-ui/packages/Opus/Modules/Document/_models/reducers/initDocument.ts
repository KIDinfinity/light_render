import initState from '../state';

/**
 * 初始化document redux state 中document部分数据
 * @param state redux state
 * @param param1 初始化时，也可以保留部分数据（payload 中传递过来）
 */
const initDocument = (state: any, { payload = {} }: any) => {
  return {
    ...state,
    ...initState,
    ...payload,
  };
};
export default initDocument;
