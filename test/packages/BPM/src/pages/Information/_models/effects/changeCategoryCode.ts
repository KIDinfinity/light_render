import lodash from 'lodash';

export default function* changeCategoryCode({ payload }: any, { select, put }: any) {
  const { id, categoryCode } = payload;
  const addInformations = yield select(
    (state) => state.navigatorInformationController.addInformations
  );
  const index = lodash.findIndex(addInformations, ['id', id]);
  addInformations[index].informationData = categoryCode;
  yield put({
    type: 'saveSnapshot',
    payload: {
      data: addInformations,
    },
  });
}
