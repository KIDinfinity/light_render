import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default function* validateFields(_: any, { select, put }: any) {
  yield put({
    type: 'formCommonController/handleValidating',
  });

  const forms = yield select((state: any) => state.formCommonController.forms);
  let errors = yield formUtils.validateFormsAndGetErrors({
    forms: lodash.values(forms),
    force: true,
  });
  const allErrors = [...errors];

  if (errors.length) {
    errors = yield put.resolve({
      type: 'validateFieldsAsync',
      payload: {
        errors: allErrors,
      },
    });

    yield put({
      type: 'saveErrorCount',
      payload: {
        errorCount: errors.length,
      },
    });
  }

  yield put({
    type: 'formCommonController/handleUnValidating',
  });

  return errors;
}
