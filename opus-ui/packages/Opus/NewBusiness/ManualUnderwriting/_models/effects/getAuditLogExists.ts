import { auditLogExists } from '@/services/dcAuditService';

/**
 * 获取修改日志列表接口
 */
export default function* getAuditLogsList({ payload }: any, { put, call, select }: IEffects) {
  const { processInstanceId, taskId, inquiryBusinessNo }: any = payload;

  const auditResponse = yield call(auditLogExists, {
    params: {
      processInstanceId,
      inquiryBusinessNo,
      taskId,
      action: ['Save'],
      platformCode: 'opus',
    },
  });

  if (auditResponse?.success) {
    yield put({
      type: 'saveAuditExists',
      payload: {
        auditLogExists: auditResponse.resultData,
      },
    });
  }
}
