import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default function* validateFields({ payload }: any, { select, put }: any) {
  const forceValidate = lodash.get(payload, 'forceValidate', false);
  yield put({
    type: 'formCommonController/handleSubmited',
  });
  yield put({
    type: 'formCommonController/handleValidating',
  });
  const { forms = {}, isUpdate } = yield select((state: any) => ({
    ...state.formCommonController,
    isUpdate: state.configureUserController?.isUpdate,
  }));
  // 单条修改才校验
  if (!isUpdate && !forceValidate) {
    return [];
  }

  const formDatas: any[] = lodash.values(forms);
  const errors = yield formUtils.validateFormsAndGetErrors({ forms: formDatas, force: true });
  yield put({
    type: 'formCommonController/handleUnValidating',
  });
  return errors;
}
