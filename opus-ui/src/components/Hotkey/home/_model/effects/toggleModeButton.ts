function* toggleModeButton(_: any, { put }: any) {
  yield put({
    type: 'navigatorHomeWatching/toggleModeEnter',
  });
}

export default toggleModeButton;
