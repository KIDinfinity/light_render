import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import changeProcedureType from '../functions/changeProcedureType';
const delay = (timeout: number) => new Promise((resolve) => setTimeout(resolve, timeout));

export default [
  // eslint-disable-next-line func-names
  function* ({ target, payload }: any, { put, call }: any) {
    yield call(delay, 10);
    yield put({
      type: target,
      payload: {
        ...payload,
      },
    });

    const procedureType = formUtils.queryValue(payload?.changedFields?.procedureType);
    if (!lodash.isNil(procedureType) && !lodash.isNil(payload?.dispatch)) {
      changeProcedureType({
        dispatch: payload?.dispatch,
        procedureType,
        treatmentId: payload?.treatmentId,
        claimNo: payload?.claimNo,
      });
    }
  },
  { type: 'takeLatest' },
];
