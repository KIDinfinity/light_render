import Config from '../../Config';
import lodash from 'lodash';
export default function* (_: any, { takeLatest, put, select }: any) {
  yield takeLatest(Config.onFieldChange, function* action({ payload }: any) {
    const validating = yield select(
      ({ formCommonController }: any) => formCommonController.validating
    );
    let unionValidating;
    if (lodash.isArray(payload.changeFields)) {
      unionValidating = lodash.every(payload.changeFields, (item) => item.validating);
    }

    if (validating || unionValidating || (payload.changedFields && lodash.size(payload.changedFields) > 1)) return;
    yield put({
      type: 'saveChangedFields',
      payload,
    });
  });
}
