import lodash from 'lodash';

export default function* toggleActiveEditTab({ payload }: any, { put, select }: any) {
  const { id } = lodash.pick(payload, ['id']);
  const { activeEditTabs } = yield select((state: any) => ({
    activeEditTabs: state?.navigatorInformationController?.activeEditTabs,
  }));
  const list = new Set(activeEditTabs);
  if (list.has(id)) {
    list.clear();
  } else {
    list.clear();
    list.add(id);
  }
  yield put({
    type: 'setActiveEditTabs',
    payload: {
      activeEditTabs: [...list],
    },
  });
}
