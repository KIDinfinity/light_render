import lodash from 'lodash';

export default function* deleteInformation({ payload }: any, { put, select }: IEffects) {
  const id = lodash.get(payload, 'id', '');
  const addInformation = yield select(
    (state) => state?.navigatorInformationController?.addInformations
  );
  const record = lodash.filter(addInformation, (item) => item.id !== id);
  yield put({
    type: 'setAddInformations',
    payload: {
      record,
    },
  });
  yield put({
    type: 'saveSnapshot',
    payload: {
      data: record,
    },
  });
}
