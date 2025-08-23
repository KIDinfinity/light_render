import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default function* validateFields(_: any, { select, put }: any) {
  yield put({
    type: 'formCommonController/handleValidating',
  });
  const forms = yield select(({ formCommonController }: any) => formCommonController.forms);
  const errors = yield formUtils.validateFormsAndGetErrors({
    forms: lodash.values(forms).map(item => lodash.has(item, 'section') ? item.form : item),
    force: true,
  });

  yield put({
    type: 'formCommonController/handleUnValidating',
  });
  return errors;
}
