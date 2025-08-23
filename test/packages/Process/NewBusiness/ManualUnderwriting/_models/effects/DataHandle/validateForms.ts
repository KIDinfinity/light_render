import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

// 校验处理
// formKey 支持前缀包含。
function isSameKey(formId: string, formKey: string) {
  return lodash.includes(formId, formKey);
}
function isInFormKeys(formKeys: string[], formId: string) {
  return formKeys.some((formKey) => isSameKey(formId, formKey));
}
export default function* ({ payload: { formKeys } }: any, { select, put }: any) {
  if (!formKeys || lodash.isEmpty(formKeys)) return [];
  yield put({
    type: 'formCommonController/handleValidating',
  });

  const forms = yield select(({ formCommonController }: any) => formCommonController.forms) || {};

  const validates = lodash
    .chain(lodash.keys(forms))
    .reduce((arr: any, key: string) => {
      return isInFormKeys(formKeys, key) ? [...arr, forms[key]] : arr;
    }, [])
    .value();

  const errors: any = yield formUtils.validateFormsAndGetErrors({
    forms: validates,

    force: true,
  });
  yield put({
    type: 'formCommonController/handleUnValidating',
  });

  return errors;
}
