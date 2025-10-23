import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { getAllFormErrors } from '@/utils/medicalSearch';

export default function* validateFields(_: any, { select, put }: any) {
  yield put({
    type: 'formCommonController/handleValidating',
  });
  const forms = yield select((state: any) => state.formCommonController.forms);
  let errors = yield formUtils.validateFormsAndGetErrors({
    forms: lodash.values(forms),
    force: true,
  });
  const validateMessages = yield select((state) => state.medicalValidate.validateResult);
  const servicesValidateErrors = getAllFormErrors({
    validateMessages,
  });
  const allErrors = [...errors, ...servicesValidateErrors];
  if (errors.length) {
    errors = yield put.resolve({
      type: 'validateFieldsAsync',
      payload: {
        errors: allErrors,
      },
    });
  }

  yield put({
    type: 'formCommonController/handleUnValidating',
  });

  return errors;
}
