import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import handleMessageModal from '@/utils/commonMessage';

import { eBenefitCategory } from 'claim/enum/BenefitCategory';

/**
 *
 * @param businessData
 * @returns
 */

// reAssessment过后的添加标识
const refactorBusinessData = (businessData: any) => {
  const newBusinessData = businessData;
  // 做过reassessment的给标识(TODO：这里应该用配置和递归的方式去写)
  (newBusinessData?.claimPayableList || []).forEach((claimPayableItem: any) => {
    if (claimPayableItem?.benefitCategory === eBenefitCategory.Reimbursement) {
      claimPayableItem?.treatmentPayableList ||
        [].forEach((treatmentPayableItem: any) => {
          treatmentPayableItem?.invoicePayableList ||
            [].forEach((invoicePayableItem: any) => {
              invoicePayableItem?.serviceItemPayableList ||
                [].forEach((servicePayableItem: any) => {
                  servicePayableItem.isReAssess = true;
                });
            });
        });
    }
  });
  return newBusinessData;
};

export default function* getReAssessmentReduxList({ payload = {} }: any, { put }: any) {
  const { nameSpace, businessData, taskDetail, claimProcessData } = payload;
  // TODO:通过mapping去做
  const newProcess = [
    'HKCLMOfClaimAssessmentController',
    'THCLMOfClaimAssessmentController',
    'JPCLMOfClaimAssessment',
    'PHCLMOfCTG008AssessmentController',
    'MYCLMOfCTG008AssessmentController',
  ];
  const oldTHProcess = ['apOfClaimAssessmentController', 'daOfClaimAssessmentController'];

  const oldPHProcess = ['PHCLMOfClaimAssessmentController', 'PHCLMOfAppealCaseController'];

  // 重新设置businessData数据
  const newBusinessData = refactorBusinessData(businessData);

  yield put({
    type: `${nameSpace}/saveClaimProcessData`,
    payload: {
      ...newBusinessData,
      processInstanceId: claimProcessData.processInstanceId,
      taskId: claimProcessData.taskId,
      taskDefKey: taskDetail?.taskDefKey,
    },
  });
  yield put({
    type: 'claimCaseController/saveSnapshot',
    payload: {
      postData: newBusinessData,
    },
  });

  // 保存理赔比较数据
  yield put({
    type: `${nameSpace}/initCompareClaimData`,
    payload: { claimData: newBusinessData },
  });

  yield put({
    type: `${nameSpace}/queryListPolicy`,
    payload: { claimNo: newBusinessData?.claimNo },
  });

  // TH旧流程
  if (lodash.includes(oldTHProcess, nameSpace)) {
    yield put({
      type: 'clearState',
      payload: {
        clear: [
          {
            path: 'claimProcessData.expectDecisionList',
            value: [],
          },
        ],
      },
    });
    yield put({
      type: `${nameSpace}/retrieve3CiIndicator`,
    });
  }
  // 旧流PH
  if (lodash.includes(oldPHProcess, nameSpace)) {
    if (newBusinessData.notificationList && newBusinessData.notificationList.length > 0) {
      yield put({
        type: 'navigatorInformationController/saveProcessInstanceIdReducer',
        payload: {
          defaultActivityCode: 'manualAssessment',
          defaultCategoryCode: 'assessmentNotice',
          processInstanceId: claimProcessData.processInstanceId,
        },
      });
      yield put({
        type: 'workspaceSwitchOn/changeSwitch',
        payload: {
          name: 'remark',
        },
      });
    }
  }
  // 新流程
  if (lodash.includes(newProcess, nameSpace)) {
    /** update Information management history */
    yield put({
      type: 'navigatorInformationController/loadAllCategoryInformation',
    });

    if (newBusinessData.notificationList && newBusinessData.notificationList.length > 0) {
      yield put({
        type: 'navigatorInformationController/saveProcessInstanceIdReducer',
        payload: {
          defaultActivityCode: 'manualAssessment',
          defaultCategoryCode: 'assessmentNotice',
          processInstanceId: claimProcessData.processInstanceId,
        },
      });
      yield put({
        type: 'workspaceSwitchOn/changeSwitch',
        payload: {
          name: 'remark',
        },
      });
    }

    yield put({
      type: `${nameSpace}/getAgentNoList`,
      payload: {
        claimNo: taskDetail?.businessNo,
      },
    });

    if (nameSpace === 'HKCLMOfClaimAssessmentController') {
      if (newBusinessData?.errorFlag === 'MSG_000608') {
        handleMessageModal([
          {
            code: `${newBusinessData.errorFlag}`,
            content: formatMessageApi({ Dropdown_CFG_MessageCode: `${newBusinessData.errorFlag}` }),
          },
        ]);
        yield put({
          type: `${nameSpace}/clearReAssessmentBreakdownError`,
        });
      }

      yield put({
        type: `${nameSpace}/getListBenefitFactors`,
        payload: {
          claimNo: newBusinessData?.claimNo,
        },
      });
      yield put({
        type: `${nameSpace}/packFactorList`,
      });
    }

    if (nameSpace === 'JPCLMOfClaimAssessment') {
      /** update OtherProcedurePayableAddItem */
      yield put({
        type: 'update',
        payload: {
          otherProcedurePayableItemAdd: '',
          procedurePayableItemAdd: '',
        },
      });
    }

    yield put({
      type: `${nameSpace}/originClaimProcessData`,
      payload: { businessData: newBusinessData },
    });
    yield put({
      type: 'paymentAllocation/saveClaimData',
      payload: { claimData: newBusinessData, reset: true },
    });
  }
}
