import lodash from 'lodash';

export default function* validateCertainFields({ payload }, { select, put }: any) {
  const { formId, fields } = payload;
  yield put({
    type: 'formCommonController/handleValidating',
  });
  const forms = yield select(({ formCommonController }: any) => formCommonController.forms);
  const form = forms[formId];
  let errors: any[] = [];
  if (form) {
    errors = yield new Promise((resolve) => {
      form.validateFields(fields, (errs: any) => {
        if (errs && lodash.isObject(errs)) {
          resolve(lodash.values(errs).map((item: any) => item.errors));
        } else {
          resolve([]);
        }
      });
    });
  }

  yield put({
    type: 'formCommonController/handleUnValidating',
  });

  return errors;
}
