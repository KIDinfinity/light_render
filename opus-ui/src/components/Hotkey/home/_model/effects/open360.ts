function* open360(_: any, { put }: any) {
  yield put({
    type: 'workspaceSwitchOn/changeSwitch',
    payload: {
      name: '360',
    },
  });
}

export default open360;
