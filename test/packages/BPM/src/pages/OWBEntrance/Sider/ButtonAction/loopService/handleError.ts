import lodash from 'lodash';
import handleMessageModal from '@/utils/commonMessage';
import { getInfoCategoryByMessage } from '@/services/bpmInfoControllerService';
import ErrorCode from 'bpm/pages/OWBEntrance/constants/ErrorCode';
import bpm from 'bpm/pages/OWBEntrance';
import openInfomation from '../../Beyond/openInfomation';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { notification } from 'antd';
/**
 * 错误处理逻辑
 * @param {Object} response
 */
export default async ({
  response,
  activityCode,
  activityStatus,
  caseCategory,
  caseNo,
  taskId,
  dispatch,
}: any) => {
  const warnNocce = lodash.get(response, 'resultData.x-warn-nonce');
  const errorNonce = lodash.get(response, 'resultData.x-error-nonce');
  const confirmIndicator = lodash.get(response, 'warnData.x-confirm-nonce');
  const promptMessages = lodash.get(response, 'promptMessages');
  if (warnNocce) {
    const getCategoryRes = await getInfoCategoryByMessage({
      buttonCode: 'cancelWarning',
      activityCode,
      activityStatus,
      caseCategory,
      caseNo,
      taskId,
      messageCode: lodash.get(promptMessages, '[0].code'),
    });
    const { categoryCode } = lodash.pick(getCategoryRes?.resultData, ['categoryCode']);
    if (categoryCode) {
      openInfomation({ categoryCode, dispatch });
    }
  }

  if (!errorNonce && !warnNocce && !confirmIndicator && lodash.isArray(promptMessages)) {
    if (lodash.some(promptMessages, (item: any) => item?.code === ErrorCode.TaskIsNotExist)) {
      bpm.reload();
      return;
    }
    if (lodash.some(promptMessages, (item: any) => item?.code === ErrorCode.TaskIsPend)) {
      notification.success({
        message: formatMessageApi({
          Label_COM_Message: 'MSG_000818',
        }),
      });
      bpm.reload();
      return;
    }
    handleMessageModal(promptMessages);
  }
};
