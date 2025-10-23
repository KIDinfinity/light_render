import lodash from 'lodash';
import { voidOrUnVoidDoc } from '@/services/docManagementControllerService';
import { formUtils } from 'basic/components/Form';
import { LS, LSKey } from '@/utils/cache';
import { Action } from '@/components/AuditLog/Enum';

export default function* submitVoid({ payload }: any, { put, call, select }: any) {
  const { actionType, dispatch } = payload;
  const businessCode = LS.getItem(LSKey.CURRENTUSER)?.businessCode;
  const documentList = yield select(
    ({ documentManagement }: any) => documentManagement.documentList
  ) || [];
  const businessNoDocumentList = yield select(
    ({ documentManagement }: any) => documentManagement.businessNoDocumentList
  ) || [];
  let voidDocumentItem = yield select(
    ({ documentManagement }: any) => documentManagement.voidDocumentItem
  );
  voidDocumentItem = formUtils.cleanValidateData(voidDocumentItem);

  const oldDocumentItem = lodash
    .chain(documentList)
    .concat(businessNoDocumentList)
    .find(['id', voidDocumentItem?.id])
    .value();

  const response = yield call(voidOrUnVoidDoc, {
    ...oldDocumentItem,
    voidFlag: voidDocumentItem.voidFlag,
    businessCode,
  });

  const { success } = lodash.pick(response, ['success']);
  if (success) {
    yield put.resolve({
      type: 'updateDocuments',
      payload: {
        documents: {
          docId: voidDocumentItem.docId,
          voidFlag: voidDocumentItem.voidFlag,
          claimNo: voidDocumentItem.businessNo,
        },
      },
    });
    if (actionType === Action.SetVoid) {
      dispatch({
        type: 'auditLogController/logTask',
        payload: {
          action: Action.SetVoid,
        },
      });
    }
  }
  return response;
}
