import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default function* validateFields(_, { select, put }: any) {
  yield put({
    type: 'formCommonController/handleValidating',
  });
  const forms = yield select((state: any) => state.formCommonController.forms);

  const newForms = lodash.omitBy(forms, (item, key) => {
    return !lodash.includes(key, 'PopUp');
  });

  const errors = yield formUtils.validateFormsAndGetErrors({
    forms: lodash.values(newForms),
    force: true,
  });

  yield put({
    type: 'formCommonController/handleUnValidating',
  });

  return errors;
}
