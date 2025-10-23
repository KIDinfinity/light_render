import { isEmpty } from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { notification } from 'antd';
import { retry } from '@/services/navigatorCaseOperationControllerService';
import handleMessageModal from '@/utils/commonMessage';
export default function* (_: any, { put, call }: any) {
  const claimProcessData = yield put.resolve({
    type: 'getDataForSubmit',
  });
  const headers = !isEmpty(claimProcessData?.retry)
    ? {
        headers: {
          retry: true,
          retryIntegrationCodes: claimProcessData?.retry?.join(','),
        },
      }
    : {};
  const response = yield call(
    retry,
    {
      caseNo: claimProcessData?.businessInfo.bizCaseNo,
      taskId: claimProcessData?.businessInfo.bizTaskId,
      caseCategory: claimProcessData?.businessInfo.bizCaseCategory,
      activityKey: claimProcessData?.businessInfo.bizActivity,
      businessNo: claimProcessData?.businessInfo.businessNo,
      operationType: 'auto',
    },
    headers
  );

  if (response && !response?.success && response?.promptMessages?.length) {
    handleMessageModal(response?.promptMessages);
    return;
  }

  if (response && response?.success) {
    notification.success({
      message: formatMessageApi({
        Label_COM_WarningMessage: `venus_bpm.message.retry.success`,
      }),
    });
    yield put({
      type: 'getRetryList',
    });
  }
}
