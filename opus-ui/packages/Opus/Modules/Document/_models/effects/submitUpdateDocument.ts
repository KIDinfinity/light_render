import lodash from 'lodash';
import { updateDocInfoV2 } from '@/services/docManagementControllerService';
import { formUtils } from 'basic/components/Form';
import { LS, LSKey } from '@/utils/cache';
import { Action } from '@/components/AuditLog/Enum';

/**
 * 从task detail中获取case information
 */
export default function* submitUpdateDocument({ payload }: any, { call, put, select }: any) {
  const fileName = lodash.get(payload, 'fileName', '');
  const businessCode = LS.getItem(LSKey.CURRENTUSER)?.businessCode;

  let documentEdit = yield select(({ documentManagement }: any) => documentManagement.documentEdit);

  documentEdit = formUtils.cleanValidateData(documentEdit);
  const suffix = lodash.last(fileName.split('.')) || '';

  if (lodash.isEmpty(documentEdit?.name)) {
    return;
  }

  const response = yield call(updateDocInfoV2, {
    ...documentEdit,
    name: `${documentEdit?.name}.${suffix}`,
    businessCode,
  });

  const { success } = lodash.pick(response, ['success']);
  if (success) {
    yield put({
      type: 'updateDocuments',
      payload: {
        documents: {
          ...documentEdit,
          name: `${documentEdit?.name}.${suffix}`,
        },
        allUpdate: true,
      },
    });
    yield put({
      type: 'setEditConfirmationVisibility',
      payload: {
        editConfirmationVisibility: false,
      },
    });
    yield put({
      type: 'setEditVisit',
      payload: {
        editVisit: false,
        documentEdit: [],
      },
    });
    yield put({
      type: 'setEditUploadedVisibility',
      payload: {
        editUploadedVisibility: true,
      },
    });
    yield put({
      type: 'auditLogController/logTask',
      payload: {
        action: Action.EditDocument,
      },
    });
  }
}
