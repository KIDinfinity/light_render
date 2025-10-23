import { notification } from 'antd';
import lodash from 'lodash';
import { manualMarkDocArrived } from '@/services/documentSubmissionControllerService';
import { Action } from '@/components/AuditLog/Enum';
import bpm from 'bpm/pages/OWBEntrance';
import { isAllReceived } from '../../Utils/documentUtils';
import { TaskStatus } from '../../Enum';

// [0] 成功 ? [1] : [4]
// [1] 设置当前必要书的 documentStatus 为 'R'，若 taskStatus === 'pending' 且 所有必要数 documentStatus 都是 'R' 则 [2]，否则 [3]
// [2] 调用 handleReload，隐藏弹窗 - hideConfirmModal，解锁按钮 - unLockDocumentStatusChange ==> END
// [3] 隐藏弹窗 - hideConfirmModal，解锁按钮 - unLockDocumentStatusChange ==> END
// [4] 提示调用出错，解锁按钮 - unLockDocumentStatusChange ==> END

export default function* ({ payload }: any, { call, put, select }: any) {
  const { taskDetail } = payload;
  const { inquiryClaimNo, businessNo, taskStatus, caseCategory, processInstanceId } = taskDetail;
  const { currentDocument, batchNo } = yield select((state: any) => ({
    currentDocument: state.JPCLMOfQualityController.currentDocument,
    batchNo: state.JPCLMOfQualityController.claimProcessData.claimDatas.bpoBatchDataVO,
  }));
  const {
    formCategory,
    formData: { bpmDocumentId, documentId, applicationNo, documentTypeCode },
  } = currentDocument;

  yield put.resolve({ type: 'lockDocumentStatusChange' });

  const response = yield call(manualMarkDocArrived, {
    docId: bpmDocumentId,
    docTypeCode: documentTypeCode,
    caseCategory,
    parentBusinessNo: inquiryClaimNo,
    businessNo,
    caseNo: processInstanceId,
    appNo: applicationNo,
    batchNo,
    formCategory,
  });

  if (response.success) {
    yield put.resolve({
      type: 'setDocumentStatusReceived',
      payload: { documentId },
    });

    yield put({
      type: 'saveSnapshot',
    });

    const { bpoFormDataList } = yield select(
      (state: any) => state.JPCLMOfQualityController.claimProcessData.claimEntities
    );
    if (lodash.toLower(taskStatus) === TaskStatus.Pending && isAllReceived(bpoFormDataList)) {
      bpm.reload();
    }
    yield put({ type: 'hideConfirmModal' });
    yield put({ type: 'unLockDocumentStatusChange' });

    /** --- audiLog --- */
    yield put({
      type: 'auditLogController/logTask',
      payload: {
        action: Action.MarkDocArrived,
      },
    });
  } else {
    notification.error({ message: response.promptMessages });
    yield put({ type: 'unLockDocumentStatusChange' });
  }
}
