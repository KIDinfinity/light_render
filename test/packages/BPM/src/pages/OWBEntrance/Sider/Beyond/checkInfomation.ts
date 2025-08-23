import lodash from 'lodash';
import request from '@/utils/request';
import handleMessageModal from '@/utils/commonMessage';
import openInfomation from './openInfomation';

/**
 * 检查 information(备注管理)
 * @param {object} buttonConfig
 * @return {bool} 是否通过校验
 */
export default async ({ buttonConfig, dispatch, taskDetail }: any) => {
  if (buttonConfig.checkInformationApiUrl) {
    let needCheck = true;
    if (lodash.isFunction(buttonConfig?.checkInformationBefore)) {
      needCheck = await buttonConfig?.checkInformationBefore({ dispatch, taskDetail });
    }
    if (!needCheck) {
      return true;
    }
    const response = await request(buttonConfig.checkInformationApiUrl, {
      method: 'POST',
      body: {
        buttonCode: buttonConfig.buttonCode,
        taskId: taskDetail.taskId,
        caseNo: taskDetail.processInstanceId,
        caseCategory: taskDetail.caseCategory,
        activityCode: taskDetail.taskDefKey,
        activityStatus: taskDetail.taskStatus,
        operationType: 'validateCreateAppeal',
        businessNo: taskDetail.businessNo,
        inquiryBusinessNo: taskDetail.inquiryBusinessNo,
      },
    });

    if (
      !lodash.isPlainObject(response) ||
      !response.success ||
      !lodash.isPlainObject(response.resultData)
    ) {
      return false;
    }

    if (!response.resultData.checkResult) {
      if (lodash.isArray(response.promptMessages)) {
        handleMessageModal(response.promptMessages);
      }

      const { categoryCode, popUpCaseNo } = response.resultData;
      console.log('popUpCaseNo', popUpCaseNo, categoryCode);
      // TODO: XXXX
      if (popUpCaseNo) {
        await dispatch({
          type: 'navigatorInformationController/saveProcessInstanceIdReducer',
          payload: {
            processInstanceId: popUpCaseNo,
          },
        });
        dispatch({
          type: 'navigatorInformationController/setAppealCaseNoCover',
          payload: {
            appealCaseNoCover: true,
          },
        });
        dispatch({
          type: 'navigatorInformationController/laterLoadInformationData',
        });
      }
      if (categoryCode) {
        openInfomation({ categoryCode, dispatch });
      }

      return false;
    }
  }

  return true;
};
