import { Action } from '@/components/AuditLog/Enum';
import { Region, tenant } from '@/components/Tenant';
import { ErrorTypeEnum } from '@/enum/ErrorType';
import bpmBusinessProcessService from '@/services/bpmBusinessProcessService';
import bpmFavoriteProcessService from '@/services/bpmFavoriteProcessService';
import bpmInfoControllerService from '@/services/bpmInfoControllerService';
import bpmProcessInstanceService from '@/services/bpmProcessInstanceService';
import bpmProcessRelationshipService from '@/services/bpmProcessRelationshipService';
import bpmProcessTaskService from '@/services/bpmProcessTaskService';
import bpmThClaimProcessControllerService from '@/services/bpmThClaimProcessControllerService';
import caseMgntBusinessProcessControllerService from '@/services/caseMgntBusinessProcessControllerService';
import caseMgntProcessInstanceControllerService from '@/services/caseMgntProcessInstanceControllerService';
import { getRuleResultByCaseNo } from '@/services/caseMgntProcessRpcRelationshipService';
import { validateInstantPaymentTrigger } from '@/services/claimInstantPaymentControllerService';
import dcClaimCaseControllerService from '@/services/dcClaimCaseControllerService';
import integrationControllerService from '@/services/integrationControllerService';
import { removeBusinessObject } from '@/services/integrationLifeAsiaInterfaceControllerService';
import miscDictionaryControllerService from '@/services/miscDictionaryControllerService';
import navigatorCaseOperationControllerService from '@/services/navigatorCaseOperationControllerService';
import navigatorLabelService from '@/services/navigatorLabelService';
import owbNbAppealControllerService from '@/services/owbNbAppealControllerService';
import owbRegistrationSubmissionControllerService from '@/services/owbRegistrationSubmissionControllerService';
import rbac2ResourceControllerService from '@/services/rbac2ResourceControllerService';
import handleMessageModal from '@/utils/commonMessage';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { findDictionaryByTypeCode as findDictionaryByTypeCodeCache } from '@/utils/dictionary';
import { validateResErrorTypeError, validateResErrorTypeWarn } from '@/utils/utils';
import { notification } from 'antd';
import TaskStatus from 'basic/enum/TaskStatus';
import { ButtonCode } from 'bpm/enum';
import ProcessUtils from 'bpm/utils/process';
import CaseCategory from 'enum/CaseCategory';
import { produce } from 'immer';
import lodash from 'lodash';
import asyncTouch from 'navigator/models/effects/asyncTouch';
import FlowUtils from 'navigator/utils/flow';
import { serialize as objectToFormData } from 'object-to-formdata';
import { history } from 'umi';

const flowUtils = new FlowUtils();
const processUtils = new ProcessUtils();

const saveData = (state: any, action: any, key: any) => {
  const value = lodash.get(action, `payload.${key}`);
  return {
    ...state,
    [key]: value,
  };
};

const initialState = {
  list: {},
  activityList: [],
  activityLogs: [],
  activityLogList: [],
  favorStatus: false,
  caseCategory: [],
  caseRelationship: [],
  infoData: {},
  isCaseEnd: true,
  isClaimReversal: false,
  isDocumentAllowed: false,
  parentClaimNo: '',
  defaultCategoryCode: '',
  caseCategoryOptions: [],
  process: null,
  processOverviewModalVisible: false,
  isClaimReverse: false,
  indicator: {},
  isShowRuleResultsModal: false,
};

interface IHistoryState {
  appealFlag?: string | null;
  businessDecision?: string;
  businessNo?: string;
  caseCategory?: string;
  companyCode?: string | null;
  creator?: string;
  currentActivityKey?: string;
  currentTaskId?: string;
  deleted?: number;
  fullStp?: string;
  gmtCreate?: string;
  gmtModified?: string;
  id?: string;
  inquiryBusinessNo?: string;
  insured?: string;
  insuredFirstName?: string | null;
  insuredLastName?: string | null;
  isSendPMA?: string | null;
  level?: string;
  modifier?: string;
  policyOwnerName?: string | null;
  processDefId?: string;
  processInstanceId?: string;
  status?: string;
  submissionDate?: string;
  transId?: string;
  urgent?: string | null;
}

export default {
  namespace: 'workspaceCases',

  state: initialState,

  effects: {
    *parpareDataForNB(_: any, { call }: any) {
      const regionCode = tenant.region();
      const policyRes = yield call(integrationControllerService.start, {
        businessInfo: {},
        integrationCode: 'EXT_O_IL_NB_ApplyNBApplicationNo',
        regionCode,
        requestData: {
          businessCode: 'BIZ003',
          interfaceId: 'I004002',
          numberType: 'P',
        },
        retry: false,
      });
      const applicationNoRes = yield call(integrationControllerService.start, {
        businessInfo: {},
        integrationCode: 'EXT_O_IL_NB_ApplyNBApplicationNo',
        regionCode,
        requestData: {
          businessCode: 'BIZ003',
          interfaceId: 'I004002',
          numberType: 'A',
        },
        retry: false,
      });
      const policyNo = lodash.get(policyRes, 'resultData.responseData', '');
      const businessNo = (() => {
        if (regionCode === Region.PH) {
          return `01${policyNo}`;
        }
        return lodash.get(applicationNoRes, 'resultData.responseData', '');
      })();
      return {
        businessNo,
        policyNo,
        inquiryBusinessNo: businessNo,
      };
    },
    *loadProcessOverview({ payload }: any, { put, call }: any) {
      const { processInstanceId } = payload;
      const response = yield call(
        caseMgntProcessInstanceControllerService?.getProcessOverview,
        objectToFormData({
          processInstanceId,
        })
      );
      let { mainProcess, subProcess, parentProcess } = lodash.pick(response?.resultData, [
        'mainProcess',
        'subProcess',
        'parentProcess',
      ]);
      mainProcess = processUtils.addProcessModifiedTime({ process: mainProcess });
      subProcess = lodash.map(subProcess, (p) =>
        processUtils.addProcessModifiedTime({ process: p })
      );
      parentProcess = processUtils.addProcessModifiedTime({ process: parentProcess });
      let process = {};
      const mainStartProcessLinkId = flowUtils.findSartLinkId({
        parentProcess,
        mainProcess,
      });

      const mainEndProcessLinkId = flowUtils.findEndLinkId({
        parentProcess,
        mainProcess,
      });

      const main = {
        ...mainProcess,
        startLinkTaskId: mainStartProcessLinkId,
        endLinkTaskId: mainEndProcessLinkId,
      };
      const sub = subProcess?.map((s: any) => {
        const startId = flowUtils.findSartLinkId({
          parentProcess: mainProcess,
          mainProcess: s,
        });
        const endId = flowUtils.findEndLinkId({
          parentProcess: mainProcess,
          mainProcess: s,
        });
        return {
          ...s,
          startLinkTaskId: startId,
          endLinkTaskId: endId,
          level: 2,
        };
      });
      if (parentProcess && !subProcess) {
        process = {
          mainProcess: parentProcess || {},
          subProcess: [{ ...main, level: 2 }],
          currentProcess: main,
        };
      } else if (!parentProcess) {
        process = {
          mainProcess: main,
          subProcess: sub,
          currentProcess: main,
        };
      } else if (parentProcess && subProcess && mainProcess) {
        const grandChildProcess = lodash.map(sub, (item) => {
          return {
            ...item,
            level: 3,
          };
        });

        process = {
          mainProcess: parentProcess || {},
          subProcess: [
            {
              ...main,
              level: 2,
            },
            ...grandChildProcess,
          ],
          currentProcess: main,
        };
      }
      yield put({
        type: 'setProcessOverview',
        payload: {
          process,
        },
      });
    },
    *judgeIsShowRemark(_: any, { call, select, put }: any) {
      yield put({ type: 'clearDefaultCategoryCode' });
      const caseNo = yield select(
        (state: any) => state?.workspaceCases?.infoData?.processInstanceId
      );
      const defaultActivityResponse = yield call(
        bpmProcessTaskService.getDefaultActivityCode,
        objectToFormData({
          dataKey: 'caseNo',
          dataValue: caseNo,
        })
      );

      const userId = yield select((state: any) => state?.user?.currentUser?.userId);
      const taskId = yield select((state: any) => state.navigatorInformationController?.taskId);
      const loadActivityCategoryParams = taskId
        ? {
            userId,
            caseNo,
            taskId,
          }
        : {
            userId,
            caseNo,
          };

      const activityCategoryResponse = yield call(
        bpmProcessTaskService.loadActivityCategory,
        objectToFormData(loadActivityCategoryParams)
      );

      const activityCode = lodash.get(defaultActivityResponse, 'resultData');
      const defaultCategoryCode = activityCategoryResponse?.resultData?.defaultCategoryCode;

      yield put({
        type: 'setDefaultCategoryCode',
        payload: { defaultCategoryCode },
      });

      yield put({
        type: 'navigatorInformationController/mergeInformation',
        payload: {
          changedFields: {
            activityCode,
          },
        },
      });
    },
    *activityList({ payload }: any, { call, put }: any) {
      const response = yield call(
        caseMgntProcessInstanceControllerService.getProcessInstanceProgress,
        objectToFormData(payload)
      );
      if (response?.success) {
        yield put({
          type: 'save',
          payload: {
            activityList: lodash.get(response, 'resultData.processActivityVOList') || [],
            activityLogList: lodash.get(response, 'resultData.taskDetailList') || [],
          },
        });

        yield put({
          type: 'saveUrgent',
          payload: {
            urgent: lodash.get(response, 'resultData.urgent'),
          },
        });
      }

      return response;
    },
    *infoData({ payload }: any, { call, put }: any) {
      const response = yield call(caseMgntBusinessProcessControllerService.getCaseDetail, payload);
      const { success, type } = lodash.pick(response, ['success', 'type']);
      if (!success && type === ErrorTypeEnum.DataAuthorityException) {
        yield put({
          type: 'authController/saveNoPermissionCases',
          payload: {
            caseNo: payload?.processInstanceId,
            result: true,
          },
        });
        return false;
      }
      if (response?.success) {
        const gmtCreate = lodash.get(response, 'resultData.processInfo.gmtCreate', '');
        const infoData = {
          ...response?.resultData?.processInfo,
          ...response?.resultData?.caseSLAVO,
          gmtCreate,
        };
        yield put.resolve({
          type: 'workspaceNBHistory/saveCaseCategory',
          payload: {
            caseCategory: response?.resultData?.processInfo?.caseCategory,
          },
        });
        const companyCode = window.history?.state?.companyCode;
        const historyState: IHistoryState = { ...response?.resultData?.processInfo, companyCode };
        window.history.replaceState(historyState, 'caseManagement');
        const { businessNo } = infoData;
        const parentClaimNoResponse = yield call(
          dcClaimCaseControllerService.getParentClaimNo,
          objectToFormData({ claimNo: businessNo })
        );
        const parentClaimNo = lodash.get(parentClaimNoResponse, 'resultData.inquiryClaimNo');
        yield put({
          type: 'setInfoData',
          payload: { infoData },
        });
        yield put({
          type: 'setParentClaimNo',
          payload: { parentClaimNo },
        });

        // Bridge Claim-360
        yield put({
          type: 'insured360/saveTaskInfo',
          payload: {
            taskDetail: infoData,
          },
        });

        return {
          ...infoData,
          inquiryClaimNo: parentClaimNo,
        };
      }
      return null;
    },
    *urgent({ payload }: any, { call, put, select }: any) {
      const { oUrgent, activityKey } = yield select((state: any) => ({
        oUrgent: state.workspaceCases.urgent,
        activityKey:
          state.workspaceCases.infoData.currentActivityKey ||
          state.workspaceCases.infoData.activityKey,
      }));
      const { processInstanceId } = payload;
      const param = { processInstanceId, urgent: oUrgent === 1 ? 0 : 1 };
      const response = yield call(bpmBusinessProcessService.toggleUrgent, objectToFormData(param));
      if (response?.success) {
        yield put({
          type: 'saveUrgent',
          payload: {
            urgent: param.urgent,
          },
        });
        yield put({
          type: 'auditLogController/logCase',
          payload: {
            action: param.urgent === 1 ? Action.MarkUrgent : Action.MarkUnUrgent,
            processInstanceId,
            procActivityKey: activityKey,
          },
        });
        if (param.urgent === 1) {
          notification.success({
            message: formatMessageApi({
              Label_COM_WarningMessage: 'venus_bpm.message.urgent.active',
            }),
          });
        } else {
          notification.success({
            message: formatMessageApi({
              Label_COM_WarningMessage: 'venus_bpm.message.urgent.inactive',
            }),
          });
        }
      } else {
        notification.error({ message: 'Urgent failed, please try again later!' });
      }
    },
    *removeBusinessObject({ payload }: any, { call }: any) {
      const { businessNo, buttonCode } = payload;

      const response = yield call(
        removeBusinessObject,
        objectToFormData({
          businessNo,
          buttonCode,
        })
      );
      return response;
    },
    *claimReversal({ payload }: any, { call, select, put }: any) {
      // @ts-ignore
      const infoData: any = yield select((state: any) => state.workspaceCases?.infoData);

      const {
        caseCategory,
        currentTaskId,
        processInstanceId,
        currentActivityKey,
        businessNo,
        inquiryBusinessNo,
      } = infoData || {};

      // @ts-ignore
      const validateClaimNoResponse = yield call(
        validateInstantPaymentTrigger,
        objectToFormData({ claimNo: businessNo })
      );

      if (lodash.isPlainObject(validateClaimNoResponse) && !validateClaimNoResponse?.success) {
        handleMessageModal([
          {
            code: '1',
            content: formatMessageApi({
              Label_COM_WarningMessage: 'MSG_000646',
            }),
          },
        ]);
        return false;
      }

      // @ts-ignore
      const { currentActivityKey: activityCode } = yield select(
        (state: any) => state.workspaceCases.infoData
      ) || '';
      // @ts-ignore
      const checkInformationResult = yield put.resolve({
        type: 'checkInformation',
        payload: {
          extraParams: {
            buttonCode: ButtonCode.Revert,
            activityCode,
            businessNo: '',
            inquiryBusinessNo: '',
            operationType: '',
          },
        },
      });
      if (!checkInformationResult) {
        return false;
      }

      /**
       * 不同流程用不同的方式请求
       * 1. 配置不同流程获取的url和params
       * 2. 根据caseCategory去使用不同的配置
       * 3.返回url/params
       * 4.请求接口
       */

      const configs = {
        keys: {
          skipRemoveBisnessObject: [CaseCategory.TH_GC_CTG05],
          newTH: [CaseCategory.TH_CLM_CTG001, CaseCategory.TH_CLM_CTG002, CaseCategory.TH_GC_CTG05],
          revertThOldProcess: [CaseCategory.IDAC, CaseCategory.TH_GC_CTG06],
        },
        datas: {
          revertThOldProcess: () => {
            return {
              url: navigatorCaseOperationControllerService.revertThOldProcess,
              params: {
                businessNo,
                caseCategory,
                caseNo: processInstanceId,
                operationType: 'revert',
                taskId: currentTaskId,
              },
            };
          },
          newTH: () => {
            return {
              url: navigatorCaseOperationControllerService.revertV2,
              params: {
                taskId: currentTaskId,
                caseNo: processInstanceId,
                activityKey: currentActivityKey,
                caseCategory,
                activityVariables: { isReversal: 'Y' },
                businessNo,
                inquiryBusinessNo,
                operationType: 'revert',
              },
            };
          },
          default: () => {
            return {
              url: bpmThClaimProcessControllerService.revert,
              params: {
                ...payload,
              },
            };
          },
        },
      };
      let requestConfig: any = {
        url: '',
        params: {},
      };

      switch (true) {
        case lodash.includes(configs.keys.revertThOldProcess, caseCategory):
          requestConfig = configs.datas.revertThOldProcess();
          break;
        case lodash.includes(configs.keys.newTH, caseCategory):
          requestConfig = configs.datas.newTH();
          break;
        default:
          requestConfig = configs.datas.default();
          break;
      }
      if (lodash.isFunction(requestConfig.url) && !lodash.isEmpty(requestConfig.params)) {
        // @ts-ignore
        const response: any = yield call(requestConfig.url, requestConfig.params);
        if (response?.success) {
          yield put({
            type: 'auditLogController/logButton',
            payload: {
              action: Action.Reversal,
              processInstanceId,
              activityKey: currentActivityKey,
              taskId: currentTaskId,
            },
          });

          if (!configs.keys.skipRemoveBisnessObject.includes(caseCategory)) {
            yield put({
              type: 'removeBusinessObject',
              payload: {
                buttonCode: ButtonCode.Revert,
                businessNo,
              },
            });
          }
          history.push('/navigator/advancedquery');
        }
      }
      return true;
    },
    *claimReverse(_: any, { call, select, put }: any) {
      // @ts-ignore
      const infoData: any = yield select((state: any) => state.workspaceCases?.infoData);

      const { caseCategory, processInstanceId, businessNo, inquiryBusinessNo } = infoData || {};

      // @ts-ignore
      const userId = yield select((state: any) => state?.user?.currentUser?.userId);
      const activityCode =
        caseCategory === CaseCategory.BP_CLM_CTG009 ? 'BP_CLM_AS_ACT004' : 'HK_CLM_ACT001';
      // @ts-ignore
      const checkInformationResult = yield put.resolve({
        type: 'checkInformation',
        payload: {
          extraParams: {
            buttonCode: ButtonCode.Reverse,
            currentTaskId: '',
            activityCode,
          },
        },
      });
      // 是为了解决填写information的时候activityCode为空的问题
      yield put({
        type: 'navigatorInformationController/mergeInformation',
        payload: {
          changedFields: {
            activityCode,
          },
        },
      });
      if (!checkInformationResult) {
        return false;
      }

      // @ts-ignore
      const response: any = yield call(navigatorCaseOperationControllerService.reverse, {
        caseNo: processInstanceId,
        businessNo,
        inquiryBusinessNo,
        caseCategory,
        operationType: 'reversed',
        reversedReason: '',
        updateBy: userId,
      });
      if (response?.success) {
        notification.success({
          message: 'Reverse successfully!',
        });
        yield put({
          type: 'infoData',
          payload: { processInstanceId },
        });
        yield put({
          type: 'setClaimReverse',
          payload: {
            isClaimReverse: false,
          },
        });
      }

      return true;
    },
    *getRuleResultByCaseNo(_: any, { put, call, select }: any) {
      const caseNo = yield select(
        (state: any) => state?.workspaceCases?.infoData?.processInstanceId
      );
      const response = yield call(getRuleResultByCaseNo, { caseNo: caseNo });
      if (
        lodash.isPlainObject(response) &&
        response.success &&
        !lodash.isEmpty(response.resultData)
      ) {
        const ruleResultList = lodash.get(response, 'resultData') || [];
        yield put({
          type: 'saveRuleResultList',
          payload: {
            ruleResultList: ruleResultList,
          },
        });
      }
      return response;
    },
    /**
     * 校验时间期限
     * @param {object} buttonConfig
     * @return {bool} 是否通过校验
     */
    *preSubmitValidation({ payload }: any, { call }: any) {
      const { submitParams }: any = lodash.pick(payload, ['submitParams']);
      const response = yield call(owbNbAppealControllerService.validateExpirationDate, {
        ...submitParams,
      });
      if (
        !lodash.isPlainObject(response) ||
        !response.success ||
        !lodash.isPlainObject(response.resultData)
      ) {
        if (lodash.isArray(response.promptMessages)) {
          handleMessageModal(response.promptMessages);
        }
        return false;
      }
      return true;
    },
    /**
     * 检查information 是否有填写
     * @param {string} buttonCode
     * @return {Boolean}
     */
    *checkInformation({ payload }: any, { call, select, put }: any) {
      const { extraParams }: any = lodash.pick(payload, ['extraParams']);
      const {
        caseCategory,
        status: activityStatus,
        processInstanceId: caseNo,
        currentTaskId: taskId,
        currentActivityKey: activityCode,
        businessNo,
        inquiryBusinessNo,
      } = yield select((state: any) => ({
        ...lodash.pick(state.workspaceCases.infoData, [
          'caseCategory',
          'processInstanceId',
          'status',
          'currentTaskId',
          'currentActivityKey',
          'businessNo',
          'inquiryBusinessNo',
        ]),
      }));

      const response = yield call(bpmInfoControllerService.submitValidation, {
        businessNo,
        inquiryBusinessNo,
        activityStatus,
        caseNo,
        caseCategory,
        taskId,
        ...extraParams,
      });

      if (validateResErrorTypeError(response)) {
        return false;
      }

      if (validateResErrorTypeWarn(response)) {
        return false;
      }

      const { checkResult = false, categoryCode } = lodash.pick(response.resultData, [
        'checkResult',
        'categoryCode',
      ]);
      if (!checkResult) {
        handleMessageModal(response?.promptMessages);
        if (lodash.isString(categoryCode)) {
          yield put({
            type: 'handleOpenInfomation',
            payload: {
              categoryCode,
              activityCode: activityCode || lodash.get(extraParams, 'activityCode'),
            },
          });
        }
      }
      return checkResult;
    },
    /**
     * 打开情报管理
     */
    *handleOpenInfomation({ payload }: any, { put }: any) {
      const { categoryCode, activityCode } = lodash.pick(payload, ['categoryCode', 'activityCode']);
      yield put({
        type: 'workspaceSwitchOn/changeSwitch',
        payload: {
          name: 'remark',
        },
      });
      yield put({
        type: 'navigatorInformationController/setFieldsFromOutside',
        payload: {
          changedFields: {
            categoryCode,
            activityCode,
          },
        },
      });
      yield put.resolve({
        type: 'navigatorInformationController/autoAddInformationHandle',
        payload: {
          changedFields: {
            categoryCode,
            activityCode,
          },
        },
      });

      yield put({
        type: 'navigatorInformationController/setIsActivedGroup',
        payload: {
          isSelectedCategory: true,
        },
      });
    },
    *favor({ payload }: any, { call }: any) {
      const response = yield call(bpmFavoriteProcessService.update, payload);
      if (response?.success) {
        if (payload.deleted) {
          notification.success({ message: 'Cancellation of Favorite' });
        } else {
          notification.success({ message: 'Favorite success' });
        }
      }
    },
    *getClaimReversalStatus({ payload }: any, { call, put }: any) {
      // @ts-ignore
      const response: any = yield call(bpmThClaimProcessControllerService.checkCanRevert, payload);

      if (response?.resultData) {
        yield put({
          type: 'setClaimReversal',
          payload: {
            isClaimReversal: true,
          },
        });
      }
    },
    *getClaimReverseStatus(_: any, { put, select }: any) {
      // @ts-ignore
      const { status, businessDecision, caseCategory }: any = yield select(
        (state: any) => state?.workspaceCases?.infoData
      ) || {};

      // TODO:这里不应该用caseCategory去hardcode
      if (
        status === TaskStatus.completed &&
        businessDecision === 'A' &&
        caseCategory !== 'HK_CLM_CTG003'
      ) {
        yield put({
          type: 'setClaimReverse',
          payload: {
            isClaimReverse: true,
          },
        });
      }
    },
    *deleteCase({ payload }: any, { select, call, put }: any) {
      const response = yield call(navigatorCaseOperationControllerService.cancel, payload);
      if (response?.success) {
        notification.success({ message: response?.resultData });
        /* -- auditLog -- */
        const { processInstanceId, activityKey } = yield select((state: any) => ({
          processInstanceId: state.workspaceCases.infoData.processInstanceId,
          activityKey:
            state.workspaceCases.infoData.currentActivityKey ||
            state.workspaceCases.infoData.activityKey,
        }));
        yield put({
          type: 'auditLogController/logCase',
          payload: {
            action: Action.CancelCase,
            processInstanceId,
            procActivityKey: activityKey,
          },
        });
      }
      return response;
    },
    *startCase({ payload }: any, { call }: any) {
      const response = yield call(bpmProcessInstanceService.startProcessInstance, payload);
      if (response?.success) {
        notification.success({ message: 'success' });
      } else {
        notification.error({
          message: 'failed',
        });
      }

      return response;
    },
    *getRuleSetupCaseCategory(_: any, { call, put, select }: any) {
      const userId = yield select((state: any) => state?.user?.currentUser?.userId);
      const response = yield call(
        rbac2ResourceControllerService.listCaseCategoryByUserId,
        objectToFormData({
          userId,
        })
      );
      if (response?.success) {
        yield put({
          type: 'saveCaseCategory',
          payload: {
            caseCategory: response.resultData,
          },
        });
      }
    },
    *loadCasaeCategory(_: any, { call, put }: any) {
      const language = tenant.getLocaleLang();
      const caseCategoryOptions = yield call(findDictionaryByTypeCodeCache, {
        language,
        typeCode: 'Label_BPM_CaseCategory',
      });
      yield put({
        type: 'setCaseCategoryDicts',
        payload: {
          caseCategoryOptions,
        },
      });
    },
    *findCaseCategoryDictionaries(_: any, { call }: any) {
      const response = yield call(miscDictionaryControllerService.findCaseCategoryDictionaries);
      if (response?.success && lodash.isArray(response?.resultData)) {
        return response?.resultData;
      }
      return [];
    },
    *getCaseCategoryCompanyMap(_: any, { call }: any) {
      const response = yield call(
        owbRegistrationSubmissionControllerService.getCaseCategoryCompanyMap
      );
      return lodash.compact(response?.resultData || []);
    },
    *smartCreate({ payload }: any, { call, race, take, put }: any): any {
      const { createParams } = payload;
      // navigatorCaseOperationControllerService.create
      const [response, cancel] = yield race([
        call(navigatorCaseOperationControllerService.create, createParams),
        take('smartCancel'),
      ]);
      if (response?.success) {
        // yield put({ type: 'workspaceSwitchOn/closeSwitch' });
        yield put({
          type: 'global/visitTaskDetail',
          payload: response?.resultData,
        });
        yield put({
          type: 'workspaceAI/saveMachineKey',
          payload: { machineKey: '' },
        });

        // history.push(`/process/task/detail/${response?.resultData?.taskId}`);
      } else if (cancel) {
        notification.info({ message: 'Creation Canceled' });
      } else {
        notification.error({
          message: 'Creation Failed',
        });
      }

      return response;
    },
    *createCase({ payload }: any, { call }: any) {
      const response = yield call(navigatorCaseOperationControllerService.create, payload);

      return response;
    },
    *getCaseRelationship({ payload }: any, { call, put }: any) {
      const response = yield call(bpmProcessRelationshipService.findProcessRelationship, payload);

      if (response?.success) {
        yield put({
          type: 'saveCaseRelationship',
          payload: {
            caseRelationship: response.resultData,
          },
        });
      }
    },
    *getIndicator(_: any, { call, put, select }: any) {
      const processInstanceId = yield select(
        (state: any) => state?.workspaceCases?.infoData?.processInstanceId
      );
      const res = yield call(navigatorLabelService.getLabelByBusinessNo, [processInstanceId]);
      if (res?.success) {
        yield put({
          type: 'saveIndicator',
          payload: {
            indicator: { caseLabelList: res?.resultData?.[0]?.caseLabelList },
          },
        });
      }
    },
    asyncTouch,
  },

  reducers: {
    resetState() {
      return initialState;
    },
    setVisiable(state: any, action: any) {
      return {
        ...state,
        processOverviewModalVisible: action?.payload?.processOverviewModalVisible,
      };
    },
    setProcessOverview(state: any, action: any) {
      return {
        ...state,
        process: action?.payload?.process,
      };
    },
    setDefaultCategoryCode(state: any, action: any) {
      return saveData(state, action, 'defaultCategoryCode');
    },
    clearDefaultCategoryCode(state: any) {
      return {
        ...state,
        defaultCategoryCode: '',
      };
    },
    setParentClaimNo(state: any, action: any) {
      return saveData(state, action, 'parentClaimNo');
    },
    setInfoData(state: any, action: any) {
      return saveData(state, action, 'infoData');
    },
    setIsCaseEnd(state: any, action: any) {
      return saveData(state, action, 'isCaseEnd');
    },
    setIsDocumentAllowed(state: any, action: any) {
      return saveData(state, action, 'isDocumentAllowed');
    },
    setClaimReversal(state: any, action: any) {
      return saveData(state, action, 'isClaimReversal');
    },
    setClaimReverse(state: any, action: any) {
      return saveData(state, action, 'isClaimReverse');
    },

    clearActivityList(state: any) {
      return {
        ...state,
        activityList: [],
      };
    },
    smartCancel(state: any) {
      return state;
    },
    // 用lodash setData
    setData(state: any, action: any) {
      const operation = lodash.get(action, 'payload.operation');

      const nextState = lodash.cloneDeep(state);
      let stateToChange: any = lodash.chain(nextState);

      lodash.forEach(operation, (v) => {
        const [v0, ...vRest] = v;
        stateToChange = stateToChange[`${v0}`](...vRest);
      });
      stateToChange = stateToChange.value();

      return nextState;
    },
    saveActivityLogList(state: any, action: any) {
      const {
        payload: { activityLogList },
      } = action;

      return {
        ...state,
        activityLogList,
      };
    },
    save(state: any, action: any) {
      return {
        ...state,
        ...action.payload,
      };
    },
    saveUrgent(state: any, { payload }: any) {
      const { urgent } = payload;

      return {
        ...state,
        urgent,
      };
    },
    updateType(state: any, { payload }: any) {
      return {
        ...state,
        type: payload,
      };
    },
    saveCaseRelationship(state: any, { payload }: any) {
      const { caseRelationship } = payload;
      return {
        ...state,
        caseRelationship,
      };
    },
    setCaseCategoryDicts(state: any, action: any) {
      const caseCategoryOptions = lodash.get(action, 'payload.caseCategoryOptions', []);
      return {
        ...state,
        caseCategoryOptions,
      };
    },
    saveCaseCategory(state: any, action: any) {
      const caseCategory = lodash.get(action, 'payload.caseCategory', []);
      return {
        ...state,
        caseCategory,
      };
    },
    saveIndicator(state: any, action: any) {
      const indicator = lodash.get(action, 'payload.indicator', {});
      return {
        ...state,
        indicator,
      };
    },
    getRuleResultsModal(state: any) {
      const nextState = produce(state, (draftState: any) => {
        draftState.isShowRuleResultsModal = !draftState.isShowRuleResultsModal;
      });
      return { ...nextState };
    },
    saveRuleResultList(state: any, action: any) {
      const { ruleResultList } = action?.payload;
      const nextState = produce(state, (draftState: any) => {
        draftState.ruleResultList = ruleResultList;
      });
      return { ...nextState };
    },
  },
};
