import { Action } from '@/components/AuditLog/Enum';
import { re } from '@/services/posSrvCaseAssessControllerService';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { notification } from 'antd';
import lodash from 'lodash';
import { PremiumTypeEnum, TransactionTypeEnum } from 'process/GeneralPOS/common/Enum';
import delay from '@/utils/delay';

export default function* reAssess({ payload }: any, { put, call, select }: any) {
  const { processInstanceId, caseCategory } = yield select(
    ({ processTask }: any) => processTask.getTask
  ) || {};

  const dataForSubmit = yield put.resolve({
    type: 'getDataForSubmit',
  });
  let needDuplicateCheckList = [];
  const transactionTypes = dataForSubmit?.transactionTypes?.map((item) => {
    needDuplicateCheckList = item?.needDuplicateCheckList || [];
    if (item?.transactionTypeCode === TransactionTypeEnum.SRV006) {
      return {
        ...item,
        partialWithdrawal: {
          ...item.partialWithdrawal,
          partialWithdrawalFundList:
            item?.partialWithdrawal?.partialWithdrawalFundList
              ?.filter((listItem) => PremiumTypeEnum.BOTH === listItem.premiumType)
              ?.map((item) =>
                lodash.pick(item, ['fundCode', 'withdrawalUnit', 'withdrawalPct', 'withdrawalAmt'])
              ) || [],
        },
      };
    }
    return item;
  });
  const result = yield call(re, { ...dataForSubmit, transactionTypes, caseNo: processInstanceId });

  if (lodash.isPlainObject(result) && result.success && lodash.isPlainObject(result.resultData)) {
    yield put({
      type: 'saveClaimProcessData',
      payload: {
        ...result.resultData,
        decision: result.resultData?.transactionTypes?.[0]?.decision,
        policyInfo: {
          ...result.resultData?.policyInfo,
          clientInfoList: (result.resultData?.policyInfo?.clientInfoList || []).map((item) => ({
            ...item,
            dob: item?.dateOfBirth || item?.dob,
          })),
        },
        needDuplicateCheckList,
      },
    });
    yield put({ type: 'insured360/getCustomerTypeConfig' });
    yield put({
      type: 'navigatorInformationController/loadAllCategoryInformation',
      payload: { caseCategory },
    });
    yield put({
      type: 'setShowReAssess',
      payload: {
        showReAssess: { show: false, change: false, warnMessage: [] },
      },
    });
    yield put({
      type: 'saveSnapshot',
    });

    yield put({
      type: 'auditLogController/addAuditLog',
      payload: {
        action: Action.ReAssessment,
      },
    });

    yield put({
      type: 'saveState',
      payload: {
        isReassess: new Date().getTime(),
      },
    });

    notification.success({
      duration: 6,
      message: formatMessageApi({ Label_COM_WarningMessage: 'MSG_000931' }),
    });
  }

  if (!lodash.isUndefined(result) && !result?.success) {
    yield delay(300);
    yield put({
      type: 'navigatorInformationController/loadAllCategoryInformation',
      payload: { caseCategory: caseCategory },
    });
    yield put({
      type: 'setShowReAssess',
      payload: {
        showReAssess: { show: true, change: true, warnMessage: ['MSG_001137'] },
      },
    });
    yield put({
      type: 'saveSnapshot',
    });
  }
  if (!result?.success && !result?.resultData) {
    notification.error({
      duration: 6,
      message: formatMessageApi({ Label_COM_WarningMessage: 'MSG_000932' }),
    });
  }
}
