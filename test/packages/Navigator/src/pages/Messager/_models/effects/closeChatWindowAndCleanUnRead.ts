export default function* (_, { put }) {
  // 关闭窗口前清除数据
  yield put({ type: 'cleanUnread' });
  yield put({
    type: 'closeChatWindow',
  });
}
