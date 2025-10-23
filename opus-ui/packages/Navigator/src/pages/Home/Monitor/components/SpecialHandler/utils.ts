import { centerRequest, handleCase } from '@/services/monitorCenterControllerService';
import { MonitorItemCode } from '../../enum';
import { filterEmptyValue, monitorParams } from '../../utils';
import { safeParseUtil } from '@/utils/utils';
import lodash from 'lodash';

export const queryDataList = async (params: any) => {
  const response = await centerRequest(
    ...monitorParams(MonitorItemCode.tools_special_handler, {
      ...filterEmptyValue({ ...params }),
    })
  );
  const { success, responseData, messageList } = response;
  if (!success || !lodash.isEmpty(responseData.exceptionMsg)) {
    const exceptionMsg = lodash.map(safeParseUtil(responseData.exceptionMsg), (msg) => ({
      code: '000',
      content: msg,
    }));
    return Promise.reject(lodash.concat(messageList || [], exceptionMsg));
  }
  const resultData = await safeParseUtil(responseData?.resultData);
  if (!resultData?.success) {
    return Promise.reject(resultData?.promptMessages);
  }
  return Promise.resolve(resultData?.resultData || []);
};

export const commitCase = async (params: any) => {
  const response = await handleCase(params);
  const { success, promptMessages } = response;
  if (!success) {
    return Promise.reject(promptMessages);
  }
  return Promise.resolve();
};

export const getActiveIssueDefaultData = () => {
  return {
    executeLastActivityBusiness: 'false',
    triggerPostQC: 'false',
    sendLetter: 'N',
    sendSms: 'N',
    releasePolicyPack: 'N',
  };
};
