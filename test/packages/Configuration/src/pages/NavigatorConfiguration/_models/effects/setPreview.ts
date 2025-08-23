import { Status } from '../../Enum';
import Config from '../config';

export default function* ({ payload }: any, { put }: any) {
  const { record: previewRecord, functionCode } = payload;
  const { cc_latest_status, cc_task_id } = previewRecord || {};

  // 修改中 打开预览弹窗
  if (cc_latest_status === Status.modifying && cc_task_id) {
    yield put({
      type: 'openTask',
      payload: {
        taskId: cc_task_id,
      },
    });
    return;
  }

  // 是审核中，跳转
  if (cc_latest_status === Status.underAuditApprover && cc_task_id) {
    yield put({
      type: 'global/visitTaskDetail',
      payload: {
        taskId: cc_task_id,
      },
    });
    return;
  }

  if(Config(functionCode)?.setPreview){
    yield put({
      type: Config(functionCode)?.setPreview,
      payload: {
        previewRecord,
      },
    });
  }
  yield put({
    type: 'showPreviewModal',
    payload: {
      previewRecord
    }
  });
}
