import { checkReassessButtonStatus } from '@/services/posSrvPreviewControllerService';
import lodash from 'lodash';
import { DecisionEnum } from 'process/GeneralPOS/common/Enum';

export default function* ({ payload }, { call, put }: any) {
  const { srvNo, transactionTypes, decision, srvCaseIndicatorList } = payload || {};

  const result = yield call(checkReassessButtonStatus, {
    srvNo,
    transactionTypes,
    srvCaseIndicatorList,
  });

  if (lodash.isPlainObject(result) && result.success) {
    if (result?.resultData?.displayExclamationMark) {
      yield put({
        type: 'setShowReAssess',
        payload: {
          showReAssess: {
            show: decision !== DecisionEnum.D ? true : false,
            change: true,
            warnMessage: [...result?.resultData?.messageList],
          },
        },
      });
    }
  }
}
