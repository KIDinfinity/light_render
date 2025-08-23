import lodash from 'lodash';
import { simpleLog } from '@/services/logCenterTatLogControllerService';

export default function* logTat({ payload }: any, { call }: any) {
  const { operator, traceId, spanId, operation, traceStatus } = lodash.pick(payload, [
    'operator',
    'traceId',
    'spanId',
    'traceStatus',
    'operation',
  ]);
  yield call(simpleLog, {
    version: 1,
    operation,
    operator,
    traceStatus,
    traceId,
    spanId,
  });
}
