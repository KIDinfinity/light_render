import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default function* validateFields(_: any, { select, put }: any) {
  yield put({
    type: 'formCommonController/handleValidating',
  });

  const forms: Object[] = yield select(
    ({ envoyController }: any) => envoyController.previewForm
  );

  const errors: Object[] = yield formUtils.validateFormsAndGetErrors({
    forms: lodash.values(forms),
    force: true,
  });

  yield put({
    type: 'formCommonController/handleUnValidating',
  });

  return errors;
}
