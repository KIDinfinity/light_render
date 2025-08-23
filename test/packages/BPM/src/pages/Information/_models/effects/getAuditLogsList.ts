import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { page } from '@/services/dcAuditService';
import type { IEffects } from '../interfaces/index';

/**
 * 获取修改日志列表接口
 */
export default function* getAuditLogsList({ payload }: any, { put, call, select }: IEffects) {
  const { informationData, triggerPointCode } = yield select(
    (state: any) => state.navigatorInformationController
  );
  const { params }: any = payload;
  const processInstanceId = formUtils.queryValue(informationData.caseNo);
  const auditResponse = yield call(page, {
    ...params,
    params: {
      ...params.params,
      processInstanceId: params.params?.processInstanceId || processInstanceId || '',
      action: triggerPointCode,
    },
  });

  if (
    lodash.isPlainObject(auditResponse) &&
    auditResponse?.success &&
    lodash.isPlainObject(auditResponse.resultData) &&
    lodash.isArray(auditResponse.resultData.rows)
  ) {
    const list = auditResponse.resultData.rows;

    yield put({
      type: 'saveAuditLogList',
      payload: {
        list,
      },
    });
    yield put({
      type: 'setAuditLogPagination',
      payload: {
        auditLogPagination: {
          ...params,
          hasMore: list.length === 20,
          params: {
            processInstanceId,
          },
        },
      },
    });
  }
}
