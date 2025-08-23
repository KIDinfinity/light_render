import lodash from 'lodash';
import { tenant } from '@/components/Tenant';
import { denormalizeClaimData } from '@/utils/claimUtils';
import { formUtils } from 'basic/components/Form';
import { notification } from 'antd';
import handleMessageModal from '@/utils/commonMessage';
import { getTouch } from '../functions';
import { LS, LSKey } from '@/utils/cache';
import { OperationType } from '../enum';
import { Action } from '@/components/AuditLog/Enum';
import wrapTouch from 'process/_modal/Assessment/functions/wrapTouch';

/**
 * TODO:没有处理hk/jp旧流程，因为这两个国家代码不用了
 */

function* reAssessment({ payload = {} }: any, { put, select }: any) {
  const { nameSpace, expectDecisionList = [], clearClaimAdjustmentFactor, action } = payload;

  // @ts-ignore
  const claimProcessData = yield select(
    ({ [nameSpace]: modelnamepsace }: any) => modelnamepsace.claimProcessData
  );
  // @ts-ignore
  const claimEntities = yield select(
    ({ [nameSpace]: modelnamepsace }: any) => modelnamepsace.claimEntities
  );
  const tempClaimEntites = lodash.cloneDeep(claimEntities);
  // @ts-ignore
  const taskDetail: any = yield select(({ processTask }: any) => processTask.getTask);

  const whiteList = [
    'HKCLMOfClaimAssessmentController',
    'THCLMOfClaimAssessmentController',
    'PHCLMOfCTG008AssessmentController',
    'MYCLMOfCTG008AssessmentController',
  ];
  // hbOfClaimAssessmentController这个不处理
  const oldTHProcess = ['apOfClaimAssessmentController', 'daOfClaimAssessmentController'];

  let extraParams: any = {
    expectDecisionList,
  };
  // HK/TH/PH新流程
  if (lodash.includes(whiteList, nameSpace)) {
    extraParams = {
      ...extraParams,
      claimAdjustmentFactorList: clearClaimAdjustmentFactor
        ? []
        : claimProcessData?.claimAdjustmentFactorList,
    };
  }
  // 旧流程TH
  if (lodash.includes(oldTHProcess, nameSpace)) {
    // @ts-ignore
    const followUpInquiryNoClaimList = yield put.resolve({
      type: 'followUpClaim/setInquiryNoClaimList',
    });

    extraParams = {
      ...extraParams,
      ...followUpInquiryNoClaimList,
    };
  }

  const getParams = async () => {
    const denormalizedData = denormalizeClaimData(claimProcessData, {
      ...claimEntities,
      invoiceListMap: lodash.forEach(tempClaimEntites.invoiceListMap, (invoiceItem: any) => {
        if (!invoiceItem?.invoiceCurrency) {
          // eslint-disable-next-line no-param-reassign
          invoiceItem.invoiceCurrency = tenant.currency();
        }
      }),
    });

    const { processInstanceId, taskId, caseCategory, businessNo, assignee } = lodash.pick(
      taskDetail,
      ['taskId', 'processInstanceId', 'taskDefKey', 'caseCategory', 'businessNo', 'assignee']
    );

    return {
      caseNo: processInstanceId,
      caseCategory,
      businessNo,
      taskId,
      assignee,
      activityKey: taskDetail?.taskDefKey,
      operationType: OperationType.ReAssess,
      businessData: {
        ...formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData)),

        ...extraParams,
        action,
      },
      payoutCurrency: claimProcessData.claimDecision?.payoutCurrency || tenant.currency(),
    };
  };

  /** -- auditLog -- */
  // 先于覆盖claimProcessData
  yield put.resolve({
    type: 'auditLogController/logTask',
    payload: {
      action: action || Action.ReAssessment,
    },
  });

  // @ts-ignore
  const response = yield getTouch({
    params: yield getParams(),
  });

  if (response && !lodash.isEmpty(response?.businessData)) {
    yield put({
      type: 'getReAssessmentReduxList',
      payload: {
        nameSpace,
        businessData: response?.businessData,
        taskDetail,
        claimProcessData,
        action,
      },
    });
    LS.removeItem(LSKey.REASSESSMENTTIMER);

    notification.success({
      message: 'Re-Assessment successfully!',
    });
  } else {
    handleMessageModal(response?.promptMessages);
  }

  return response;
}

export default wrapTouch(reAssessment, { showLoading: true });
