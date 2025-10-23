import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default function* validateFields(_, { select, put }: any) {
  yield put({
    type: 'formCommonController/handleValidating',
  });

  const forms: any = yield select((state: any) => state.formCommonController.forms);
  const errors: any = yield formUtils.validateFormsAndGetErrors({
    forms: lodash.values(forms),
    force: true,
  });

  yield put({
    type: 'formCommonController/handleUnValidating',
  });
  return errors;
}
