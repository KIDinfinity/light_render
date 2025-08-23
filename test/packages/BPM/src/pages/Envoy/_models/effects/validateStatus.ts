/* eslint-disable no-param-reassign */
import { isEmpty, some, values } from 'lodash';
import * as FlattenJS from 'flattenjs';
import { isActiveReason } from 'bpm/pages/Envoy/_utils/getDisabled';
import { checkMemoReceived } from 'bpm/pages/Envoy/_validator';
import { EAllowActions } from 'bpm/pages/Envoy/enum';

function* validateStatus(
  {
    payload: { currentReasonGroup, status },
  }: {
    payload: {
      currentReasonGroup?: any;
      status?: string;
    };
  },
  { put }: any
) {
  const { id: reasonGroupId } = currentReasonGroup;
  if (status !== EAllowActions.Resolve) {
    return false;
  }
  const detailErrors = currentReasonGroup?.reasonDetails?.reduce((errorMap: any, item: any) => {
    const { id: detailId, status: detailStatus } = item;
    const error = errorMap;
    if (isActiveReason(detailStatus)) {
      error[detailId] = {
        ...checkMemoReceived(item, status),
      };
    }
    return error;
  }, {});
  yield put({
    type: 'saveErrorInfo',
    payload: {
      errorInfo: {
        [reasonGroupId]: detailErrors,
      },
    },
  });

  return some(values(FlattenJS.convert(detailErrors)), (item: any) => !isEmpty(item));
}

export default validateStatus;
