function* openAI(_: any, { put }: any) {
  yield put({
    type: 'workspaceSwitchOn/changeSwitch',
    payload: {
      name: 'ai',
    },
  });
}

export default openAI;
