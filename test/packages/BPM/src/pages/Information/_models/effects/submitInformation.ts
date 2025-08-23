import lodash from 'lodash';
import { notification } from 'antd';
import { formUtils } from 'basic/components/Form';
import { findBizProcess } from '@/services/bpmBusinessProcessService';
import { saveInformation } from '@/services/navigatorInformationControllerV2Service';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Action } from '@/components/AuditLog/Enum';
import handleMessageModal from '@/utils/commonMessage';
import type { IEffects } from '../interfaces/index';
import addUpdateDate from '@/utils/addUpdateDate';
import { ESubjectType } from '@/components/SolutionRead/Enums';
import { validateResErrorTypeError } from '@/utils/utils';

enum Status {
  Completed = 'completed',
}

enum CaseCategory {
  BP_NB_CTG001 = 'BP_NB_CTG001',
}

export default function* submitInformation({ payload }: any, { call, select, put }: IEffects) {
  const userId = yield select((state) => state.user.currentUser.userId);
  const { id, businessCode, saveIfNull } = lodash.pick(payload, [
    'id',
    'businessCode',
    'saveIfNull',
  ]);
  const navigatorInformationController = yield select(
    (state: any) => state.navigatorInformationController
  );
  const activityList = yield select((state: any) => state.workspaceCases?.activityList);
  const {
    addInformations,
    classification,
    taskId,
    informationData,
    tabs,
    lockInformationData,
    allCategoryList,
    latestaskId,
    addInformationBuffer,
    caseCategory: stateCaseCategory,
  } = navigatorInformationController;
  const item = lodash.find(addInformations, ['id', id]);
  const processInstanceId = formUtils.queryValue(informationData.caseNo);
  if (lockInformationData) {
    yield put({
      type: 'chatController/submitArchiveListWithInformation',
    });
  }
  const bizReponse = yield call(findBizProcess, {
    processInstanceId,
  });

  const { caseCategory, currentActivityKey, currentTaskId, status } = lodash.pick(
    bizReponse?.resultData,
    ['caseCategory', 'currentActivityKey', 'currentTaskId', 'status']
  );

  let finalTaskId = taskId;
  const informationTab = lodash.get(item, 'informationTab', []);
  const dataSoure = formUtils.cleanValidateData(item);
  if (!taskId || (currentTaskId && taskId !== currentTaskId)) {
    // 获取taskId 的兜底逻辑
    if (
      !!currentActivityKey &&
      currentActivityKey === formUtils.queryValue(lodash.get(informationData, 'activityCode'))
    ) {
      finalTaskId = currentTaskId;
    } else {
      finalTaskId = latestaskId;
    }
  }
  let informationLinkToList: any = [];
  const informationTabValue = informationTab.value || informationTab;
  informationTabValue.forEach((value: any) => {
    if (value === 'case') {
      informationLinkToList.push({
        linkToKey: 'case',
        linkToValue: classification?.caseNo,
      });
    }
    if (value === 'insured') {
      informationLinkToList.push({
        linkToKey: 'insured',
        linkToValue: classification?.insuredId,
      });
    }
    if (value === 'policy' && lodash.get(dataSoure, 'policyIdList.length', 0) > 0) {
      const policyIdList = lodash.map(dataSoure.policyIdList, (policy) => ({
        linkToValue: policy,
        linkToKey: 'policy',
      }));
      informationLinkToList = policyIdList.concat(informationLinkToList);
    }
  });
  let defaultDate = 1;
  if (typeof dataSoure?.effectiveDate === 'object' || typeof dataSoure?.expiryDate === 'object') {
    defaultDate = 0;
  }
  const categoryCode = formUtils.queryValue(item.categoryCode);
  let procActivityKey: string;
  if (caseCategory === CaseCategory.BP_NB_CTG001 && status === Status.Completed) {
    if (!lodash.isEmpty(activityList)) {
      procActivityKey = lodash.chain(activityList).first().get('processActivityKey').value();
    } else {
      procActivityKey = 'BP_NB_ACT001';
    }
  } else {
    procActivityKey = formUtils.queryValue(informationData.activityCode);
  }
  const submitData = formUtils.cleanValidateData({
    author: userId,
    businessCode,
    processInstanceId,
    taskId: finalTaskId,
    procActivityKey,
    category: categoryCode,
    effectiveDate: item?.effectiveDate,
    expiryDate: item?.expiryDate,
    content: item?.content,
    informationLinkToList,
    caseCategory: formUtils.queryValue(caseCategory) || stateCaseCategory,
    status: 'P',
    defaultDate,
    reason: formUtils.queryValue(item?.reason),
    useTaskLevelActInfoCategoryCfg: taskId ? 'Y' : 'N',
    saveIfNull,
  });
  const response = yield call(saveInformation, submitData);
  if (lodash.get(response, 'success')) {
    yield addUpdateDate(formUtils.queryValue(informationData.caseNo));

    yield put({
      type: 'clearAuditLogList',
    });
    notification.success({
      message: formatMessageApi({
        Label_BIZ_Claim: 'app.remark.submit.success',
      }),
    });
    yield put({
      type: 'changeShowInformationList',
      payload: {
        isShowInformationList: false,
        isShowAddBtn: true,
      },
    });
    yield put({
      type: 'chatController/clearArchiveList',
    });
    yield put.resolve({
      type: 'loadAllCategoryInformation',
      payload: {
        tabs,
      },
    });
    yield put({
      type: 'clearAuditLogPagination',
    });
    yield put({
      type: 'getTriggerPointData',
    });
    yield put({
      type: 'setIsLockInformation',
      payload: {
        lockInformationData: false,
      },
    });
    yield put({
      type: 'deleteInformation',
      payload: {
        id: item.id,
      },
    });
    if (!lodash.isEmpty(addInformationBuffer)) {
      yield put({
        type: 'setAddInformationBuffer',
        payload: {
          addInformationBuffer: {
            aleadySave: true,
          },
        },
      });
    }
    yield put({
      type: 'setActivityHistoryPanel',
      payload: {
        activityHistoryPanel: [categoryCode],
      },
    });
    yield put({
      type: 'setActivityHistoryItem',
      payload: {
        activityHistoryItem: categoryCode,
      },
    });
    yield put({
      type: 'setExpenderContentModel',
      payload: {
        expenderModel: 'history',
      },
    });
    /* -- auditLog -- */
    const category = (lodash.chain(allCategoryList) as any)
      .find((listItem: any) => listItem.dictCode === submitData.category)
      .get('dictName')
      .value();
    yield put({
      type: 'auditLogController/logInformation',
      payload: {
        action: Action.AddInformation,
        category,
        processInstanceId,
        taskId,
        procActivityKey: submitData.procActivityKey,
      },
    });

    const subjectId = response?.resultData.id || '';

    if (!lodash.isEmpty(subjectId)) {
      yield put({
        type: 'solutionRead/setReadItem',
        payload: { subjectIdList: [subjectId], subjectType: ESubjectType.INFORMATION },
      });
    }
    return true;
  } else if (!response?.success && !validateResErrorTypeError(response)) {
    const promptMessages = lodash.get(response, 'promptMessages', []);
    handleMessageModal(promptMessages);
    return false;
  }
}
