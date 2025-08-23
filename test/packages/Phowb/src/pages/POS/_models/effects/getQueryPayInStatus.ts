import lodash from 'lodash';
import { queryPayInStatus } from '@/services/posControllerService';
import TaskDefKey from 'enum/TaskDefKey';
import { TransactionTypeCode } from '../../Enum';

export default function* (action: any, { call, put }: any) {
  const { posDataDetail, taskDefKey } = action.payload;
  const policyNo = posDataDetail?.posRequestInformation?.policyNo || '';
  const transactionType = posDataDetail?.posRequestInformation?.transactionType || '';
  if (
    [TaskDefKey.PH_POS_ACT003].includes(taskDefKey) &&
    !lodash.isEmpty(transactionType) &&
    transactionType === TransactionTypeCode.IssuanceDuplicatePolicy
  ) {
    if (!lodash.isEmpty(policyNo)) {
      const response = yield call(queryPayInStatus, { policyNo });
      if (response.success) {
        yield put({
          type: 'saveQueryPayInStatus',
          payload: {
            payInStatus: response.resultData,
          },
        });
      }
    }
  }
}
