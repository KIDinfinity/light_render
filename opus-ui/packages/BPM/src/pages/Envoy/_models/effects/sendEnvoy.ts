import lodash from 'lodash';
import navigatorEnvoyControllerService from '@/services/navigatorEnvoyControllerService';
import { handleErrorMessageIgnoreXErrorNotice } from '@/utils/commonMessage';
import { serialize as objectToFormData } from 'object-to-formdata';
import { Action } from '@/components/AuditLog/Enum';
import bpm from 'bpm/pages/OWBEntrance';
import { ETaskStatus, EReasonStatus } from 'bpm/pages/Envoy/enum';
import addUpdateDate from '@/utils/addUpdateDate';
import CaseCategory from 'enum/CaseCategory';
import getEnvoyDesc from 'bpm/pages/Envoy/_utils/getEnvoyDesc';

interface IAction {
  payload: {
    reasonGroup: any;
    otherData: any;
  };
}

function* sendEnvoy({ payload }: IAction, { select, call, put }: any) {
  const { reasonGroup, otherData } = payload;
  const params = yield put.resolve({
    type: 'getSendEnvoyData',
    payload: {
      reasonGroup,
      otherData,
    },
  });
  const {
    taskStatus,
    activityKey,
    caseNo,
    historyReasonGroups,
    mainPageCaseNo,
    mainPageTaskId,
    businessNo,
    inquiryBusinessNo,
  } = yield select((state: any) => ({
    ...lodash.pick(state?.envoyController, [
      'taskStatus',
      'activityKey',
      'caseNo',
      'historyReasonGroups',
      'mainPageCaseNo',
      'mainPageTaskId',
      'businessNo',
      'inquiryBusinessNo',
    ]),
  }));
  // @ts-ignore
  const res = yield call(navigatorEnvoyControllerService.activateReasonGroup, {
    ...params,
    triggerType: '1',
  });
  const result = res.resultData;

  if (lodash.isPlainObject(res) && res.success && lodash.isPlainObject(result)) {
    yield addUpdateDate(caseNo);

    yield put({
      type: 'saveGetProcessJobInfoTimeStamp',
    });

    const response = yield call(
      navigatorEnvoyControllerService.findReasonInfo,
      objectToFormData({
        caseNo,
        taskId: caseNo === mainPageCaseNo ? mainPageTaskId : '',
      })
    );

    const {
      activityKey: newActivityKey,
      businessNo: newBusinessNo,
      caseCategory: newCaseCategory,
      caseNo: newCaseNo,
      inquiryBusinessNo: newInquiryBusinessNo,
      taskId: newTaskId,
      taskStatus: newTaskStatus,
    } = lodash.pick(response?.resultData, [
      'activityKey',
      'businessNo',
      'caseCategory',
      'caseNo',
      'inquiryBusinessNo',
      'taskId',
      'taskStatus',
    ]);
    if (
      result?.reasonDetails?.[0].subCaseCategory === CaseCategory.KH_ME_CTG001 &&
      !lodash.isEmpty(result?.reasonDetails?.[0].subTaskId)
    ) {
      yield put({
        type: 'processTask/toogleMedicalRequestModal',
        payload: {
          medicalRequestModalDisplay: true,
        },
      });
      yield put({
        type: 'processTask/setSubTaskId',
        payload: {
          subTaskId: result?.reasonDetails?.[0].subTaskId,
        },
      });
    }
    if (taskStatus === ETaskStatus.TODO) {
      bpm.reload();
    }
    yield put.resolve({
      type: 'updateEnvoyData',
      payload: {
        oldData: reasonGroup,
        newData: result,
        newActivityKey,
        newBusinessNo,
        newCaseCategory,
        newCaseNo,
        newInquiryBusinessNo,
        newTaskId,
        newTaskStatus,
      },
    });
    yield put({
      type: 'delSendDataId',
      payload: {
        sendDataId: params?.id,
      },
    });
    const status = result?.status;
    if (status !== EReasonStatus.DRAFT && status !== EReasonStatus.ACTIVE) {
      yield put({
        type: 'setFocusToNewHistoryItem',
        payload: {
          historyGroupKey: historyReasonGroups?.length,
        },
      });
    }

    let memoCodeList;
    if (reasonGroup?.reasonDetails?.[0]?.pendingMemoList?.length > 0) {
      memoCodeList = reasonGroup?.reasonDetails?.[0]?.pendingMemoList.map((item) => {
        return item?.memoCode;
      });
    }

    /*  --auditLog--  */
    const { name } = lodash.pick(params, ['name']);
    const localeName = getEnvoyDesc(params?.groupCode) || name;
    yield put({
      type: 'auditLogController/logEnvoy',
      payload: {
        action: Action.SendPending,
        caseNo,
        currentActivityKey: activityKey,
        desc: localeName,
        extraData: { memoCodeList },
      },
    });
    // 更改 manualUnderwriting流程 ntu date
    if (result?.ntuDate) {
      yield put.resolve({
        type: 'manualUnderwriting/updateNtuDate',
        payload: {
          changedFields: {
            ntuDate: result?.ntuDate,
          },
        },
      });
      yield put.resolve({
        type: 'premiumSettlement/updateNtuDate',
        payload: {
          changedFields: {
            ntuDate: result?.ntuDate,
          },
        },
      });
    }
    if (result?.externalUrl && !lodash.isEmpty(result?.externalUrl)) {
      window.opener = null;
      window.open(result?.externalUrl, '_blank');
    }
  } else {
    handleErrorMessageIgnoreXErrorNotice(res);
    const failedType = lodash.get(res, 'type');
    if (failedType === 'validation_exception') {
      yield put({
        type: 'getEnvoyInfo',
        payload: {
          caseNo,
          businessNo,
          activityKey,
          isCallFindReasonInfo: true,
          inquiryBusinessNo,
        },
      });
    }
    yield put({
      type: 'delSendDataId',
      payload: {
        sendDataId: params?.id,
      },
    });
  }
  return { res, params };
}

export default sendEnvoy;
