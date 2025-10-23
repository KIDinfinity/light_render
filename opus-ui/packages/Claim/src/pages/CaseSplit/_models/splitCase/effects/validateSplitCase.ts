import { formUtils } from 'basic/components/Form';

export default function* ({}, { select, put }: any) {
  yield put({
    type: 'formCommonController/handleValidating',
  });
  const form = yield select(
    ({ formCommonController }: any) => formCommonController.forms.SplitCase_Case
  );
  const errors = yield formUtils.validateFormsAndGetErrors({
    forms: [form],
    force: true,
  });
  yield put({
    type: 'formCommonController/handleUnValidating',
  });
  return errors;
}
