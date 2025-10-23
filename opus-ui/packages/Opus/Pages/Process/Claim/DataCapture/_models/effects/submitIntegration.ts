import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
const delay = (timeout: number) => new Promise((resolve) => setTimeout(resolve, timeout));

export default function* validateFields({ payload }: any, { select, put, call }: any) {
  yield put({
    type: 'formCommonController/handleValidating',
  });
  yield call(delay, 10);

  const incidentId = lodash.get(payload, 'incidentId');
  const forms = yield select((state) => state.formCommonController.forms);
  const targetForms = lodash.pickBy(forms, (value, key) => key.includes('PopUp'));
  const errors = yield formUtils.validateFormsAndGetErrors({
    forms: lodash.values(targetForms),
    force: true,
  });

  yield put({
    type: 'formCommonController/handleUnValidating',
  });

  if (lodash.size(errors) > 0) {
    return errors;
  }
  return yield put.resolve({
    type: 'setIntegrationData',
    payload: { incidentId },
  });
}
