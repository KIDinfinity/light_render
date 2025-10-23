import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default function* validateFieldsReallocation(_: any, { select, put }: any) {
  yield put({
    type: 'formCommonController/handleValidating',
  });

  const { forms = {} } = yield select((state: any) => ({
    ...state.paymentAllocation,
  }));

  const formDatas: any[] = lodash.values(forms);
  const errors = yield formUtils.validateFormsAndGetErrorsAsync({ forms: formDatas, force: true });

  yield put({
    type: 'formCommonController/handleUnValidating',
  });

  return errors;
}
