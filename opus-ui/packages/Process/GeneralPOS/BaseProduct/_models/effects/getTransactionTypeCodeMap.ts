import lodash from 'lodash';
import { listTransactionTypesByCaseCategory } from '@/services/posSrvDownDropControllerService';
import { NAMESPACE } from '../../activity.config';

type IResponse = Record<string, any>;

export default function* getTransactionTypeCodeMap({ payload }: any, { put, select, call }: any) {
  const category = payload?.caseCategory;
  const transactionTypeCodeMap: object = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.transactionTypeCodeMap
  );

  if (lodash.isEmpty(transactionTypeCodeMap)) {
    const caseCategory: string =
      category || (yield select(({ processTask }: any) => processTask.getTask?.caseCategory));

    const result: IResponse = yield call(listTransactionTypesByCaseCategory, { caseCategory });

    if (lodash.isPlainObject(result) && result.success && lodash.isArray(result.resultData)) {
      yield put({
        type: 'transactionTypeCodeMapUpdate',
        payload: {
          transactionTypeCodeMap: lodash.groupBy(result.resultData, 'transactionTypeCode'),
        },
      });
    }
  }
}
