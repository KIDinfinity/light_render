import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default function* validateIncidents({ payload }, { select, put }: any) {
  yield put({
    type: 'formCommonController/handleValidating',
  });
  const forms = yield select(({ formCommonController }: any) => formCommonController.forms);

  if (!lodash.isPlainObject(forms)) return [];
  const formIds = Object.keys(forms).filter((formId) => formId.includes('claimRegisterValidation'));
  const formsToValidate = formIds.map((formId) => forms[formId]);
  const errors = yield formUtils.validateFormsAndGetErrors({
    forms: formsToValidate,
    force: true,
  });

  yield put({
    type: 'formCommonController/handleUnValidating',
  });

  return errors;
}
