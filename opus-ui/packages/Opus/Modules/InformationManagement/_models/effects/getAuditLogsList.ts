import lodash from 'lodash';

import NAMESPACE from '../namespace';
import { page } from '@/services/dcAuditService';
import type { IEffects } from '../interfaces/index';

/**
 * 获取修改日志列表接口
 */
export default function* getAuditLogsList({ payload }: any, { put, call, select }: IEffects) {
  //TODO暂时先用本地数据模拟

  const triggerPointCode = yield select((state: any) => state?.[NAMESPACE]?.triggerPointCode);

  const { params }: any = payload;
  const pageParams = {
    ...params,
    params: {
      ...params.params,
      action: triggerPointCode,
    },
  };
  const auditResponse = yield call(page, pageParams);

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
          ...pageParams,
          hasMore: list.length === 20,
        },
      },
    });
  }
}
