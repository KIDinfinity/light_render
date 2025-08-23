import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default function* validateFields(_: any, { select, put }: any) {
  yield put({
    type: 'formCommonController/handleSubmited',
  });
  yield put({
    type: 'formCommonController/handleValidating',
  });
  const { forms = {} } = yield select((state: any) => state.formCommonController);
  const formDatas: any[] = lodash.values(forms);

  const errors = yield formUtils.validateFormsAndGetErrors({ forms: formDatas, force: true });

  yield put({
    type: 'formCommonController/handleUnValidating',
  });
  return errors;
}
