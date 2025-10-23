import lodash from 'lodash';
import { tenant } from '@/components/Tenant';
import { denormalizeClaimData } from '@/utils/claimUtils';
import { Action } from '@/components/AuditLog/Enum';
import { formUtils } from 'basic/components/Form';
import { notification } from 'antd';
import handleMessageModal from '@/utils/commonMessage';
import wrapTouch from 'process/_modal/Assessment/functions/wrapTouch';
import { getTouch } from '../functions';
import { LS, LSKey } from '@/utils/cache';
import { OperationType } from '../enum';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { validateReAssess } from '@/services/claimJpClaimReassessService';
/**
 * TODO:没有处理hk/jp旧流程，因为这两个国家代码不用了
 */

function* reAssessment(action: any, { call, put, select }: any) {
  const {
    nameSpace,
    expectDecisionList = [],
    deleteAdjustmentList = [],
    clearClaimAdjustmentFactor,
    isNeedReAssessmentLog,
  } = action?.payload;

  // @ts-ignore
  const claimProcessData = yield select(
    ({ [nameSpace]: modelnamepsace }: any) => modelnamepsace.claimProcessData
  );
  // @ts-ignore
  const claimEntities = yield select(
    ({ [nameSpace]: modelnamepsace }: any) => modelnamepsace.claimEntities
  );
  // @ts-ignore
  const taskDetail: any = yield select(({ processTask }: any) => processTask.getTask);

  const whiteList = [
    'HKCLMOfClaimAssessmentController',
    'THCLMOfClaimAssessmentController',
    'PHCLMOfCTG008AssessmentController',
  ];
  // hbOfClaimAssessmentController这个不处理
  const oldTHProcess = ['apOfClaimAssessmentController', 'daOfClaimAssessmentController'];

  let extraParams: any = {
    expectDecisionList,
    deleteAdjustmentList,
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
    const invoiceListMap = lodash.cloneDeep(claimEntities.invoiceListMap); // 避免不可编辑只读对象的异常
    const denormalizedData = denormalizeClaimData(claimProcessData, {
      ...claimEntities,
      invoiceListMap: lodash.forEach(invoiceListMap, (invoiceItem: any) => {
        if (!invoiceItem?.invoiceCurrency) {
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
      },
      payoutCurrency: claimProcessData.claimDecision?.payoutCurrency || tenant.currency(),
    };
  };

  yield put({
    type: 'login/saveLoadingStatus',
    payload: {
      loadingStatus: true,
    },
  });

  /** -- auditLog -- */
  //MUW的split后自动reassess不应该log，isNeedReAssessmentLog传的false，其他入口现在是undefined
  if (isNeedReAssessmentLog === undefined || isNeedReAssessmentLog === true) {
    yield put.resolve({
      type: 'auditLogController/logTask',
      payload: {
        action: Action.ReAssessment,
      },
    });
  }

  // reassess前的校验
  const params = yield getParams();

  if (tenant.isJP()) {
    const validateResult = yield validateReAssess(params);

    if (!validateResult?.success) {
      yield put({
        type: 'login/saveLoadingStatus',
        payload: {
          loadingStatus: false,
        },
      });

      return;
    }
  }

  // @ts-ignore
  const response = yield getTouch({
    params,
  });
  yield put({
    type: 'login/saveLoadingStatus',
    payload: {
      loadingStatus: false,
    },
  });

  if (response && !lodash.isEmpty(response?.businessData)) {
    yield put({
      type: 'getReAssessmentReduxList',
      payload: {
        nameSpace,
        businessData: response?.businessData,
        taskDetail,
        claimProcessData,
      },
    });
    LS.removeItem(LSKey.REASSESSMENTTIMER);

    notification.success({
      message: formatMessageApi({ Label_COM_Message: 'MSG_001146' }),
    });
  } else {
    handleMessageModal(response?.promptMessages);
  }

  return response;
}

export default wrapTouch(reAssessment, { showLoading: false });
