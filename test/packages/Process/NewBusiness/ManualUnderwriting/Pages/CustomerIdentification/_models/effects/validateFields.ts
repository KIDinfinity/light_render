import lodash from 'lodash';
import { Selection, NbClientTag } from '../../Enum';
import { NAMESPACE } from '../../activity.config';
import { formUtils } from 'basic/components/Form';

// formKey 支持前缀包含。
function isSameKey(formId: string, formKey: string) {
  return lodash.includes(formId, formKey);
}
function isInFormKeys(formKeys: string[], formId: string) {
  return formKeys.some((formKey) => isSameKey(formId, formKey));
}

export default function* validateFields({ payload: { formKeys } }: any, { select, put }: any) {
  if (!formKeys || lodash.isEmpty(formKeys)) return [];
  yield put({
    type: 'formCommonController/handleSubmited',
  });
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

  const errors = yield formUtils.validateFormsAndGetErrors({
    forms: validates,
    force: true,
  });

  const claimProcessData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData
  );

  const errorsSet = new Set();
  lodash.forEach(claimProcessData?.policyList, (policyItem: any) => {
    const newClientInfoList = lodash.filter(policyItem.clientInfoList, (item: any) => {
      return lodash.every(
        item.identificationList,
        (e: any) => !lodash.includes([NbClientTag.Mismatch, NbClientTag.FullyMatch], e?.clientTag)
      );
    });
    lodash.forEach(newClientInfoList, (item: any) => {
      const showCard = lodash
        .chain(item)
        .get('roleList')
        .some((v: any) => !!v?.display)
        .value();
      if (showCard) {
        if (item.newClientFlag !== Selection.Y) {
          const selectedSuspect = lodash.find(item?.identificationList, (indentifion: any) => {
            return (
              indentifion.clientTag === NbClientTag.SuspectClient &&
              indentifion.selection === Selection.Y
            );
          });
          if (!selectedSuspect) {
            errorsSet.add(`please select client ${item?.id}`);
          }
        }
      }
    });
  });
  const totalErrors = Array.from(errorsSet);

  yield put({
    type: 'formCommonController/handleUnValidating',
  });
  return [...errors, ...totalErrors];
}
