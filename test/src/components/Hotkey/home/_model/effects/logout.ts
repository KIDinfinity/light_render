function* logout(_: any, { put }: any) {
  yield put({
    type: 'login/logout',
  });
}

export default logout;
