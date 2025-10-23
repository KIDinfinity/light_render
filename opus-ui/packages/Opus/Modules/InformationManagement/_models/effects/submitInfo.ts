import lodash from 'lodash';
import { notification } from 'antd';
import moment from 'moment';
import { findBizProcess } from '@/services/bpmBusinessProcessService';
import { saveInformation } from '@/services/navigatorInformationControllerV2Service';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Action } from '@/components/AuditLog/Enum';
import handleMessageModal from '@/utils/commonMessage';
import addUpdateDate from '@/utils/addUpdateDate';
import { findLatesTaskByCaseNo } from '@/services/bpmProcessTaskService';
import { serialize as objectToFormData } from 'object-to-formdata';
import type { IEffects } from '../interfaces/index';
import { LinkTo } from '../../enum';

export default function* ({ payload }: any, { call, select, put }: IEffects) {
  const userId = yield select((state) => state.user.currentUser.userId);
  const caseDetail = payload?.caseDetail;
  const taskDetail = yield select((state) => state.processTask?.getTask);
  const businessCode = caseDetail?.businessCode || taskDetail?.businessCode;
  const caseNo = caseDetail?.caseNo || taskDetail?.caseNo;
  const processInstanceId = caseDetail?.processInstanceId || taskDetail?.processInstanceId;
  const caseCategory = caseDetail?.caseCategory || taskDetail?.caseCategory;

  const infoController = yield select((state: any) => state.infoController);
  const activityList = yield select((state: any) => state.workspaceCases?.activityList);
  const { submitInfo, classification, curGroupCode, informationGroups } = infoController;
  const groupSubmitInfo = { ...lodash.get(submitInfo, curGroupCode, {}) };

  const bizReponse = yield call(findBizProcess, {
    processInstanceId,
  });
  const lastTaskResponse = yield call(
    findLatesTaskByCaseNo,
    objectToFormData({
      caseNo,
    })
  );

  const lastTaskId = lastTaskResponse?.resultData?.taskId;

  const {
    status,
    currentTaskId: taskId,
    currentActivityKey: activityCode,
    inquiryBusinessNo,
  } = lodash.pick(bizReponse?.resultData, [
    'currentActivityKey',
    'currentTaskId',
    'status',
    'inquiryBusinessNo',
  ]);

  let procActivityKey: string;
  if (caseCategory === 'BP_NB_CTG001' && status === 'completed') {
    if (!lodash.isEmpty(activityList)) {
      procActivityKey = lodash.chain(activityList).first().get('processActivityKey').value();
    } else {
      procActivityKey = 'BP_NB_ACT001';
    }
  } else {
    procActivityKey = activityCode;
  }

  // 写入默认信息
  const curInformationGroup = informationGroups?.[curGroupCode];

  if (curInformationGroup?.editable && !curInformationGroup.isShowDropDown) {
    const { infoCategoryCode, infoCategoryDefaultLinkTo } = lodash.get(
      curInformationGroup,
      `selectCaseCategorylist[0]`
    );
    lodash.set(groupSubmitInfo, 'infoCategoryCode', infoCategoryCode);
    lodash.set(groupSubmitInfo, 'infoCategoryLinkTo', infoCategoryDefaultLinkTo);
  }
  // 判空校验
  if (
    lodash.isEmpty(groupSubmitInfo) ||
    !groupSubmitInfo.comment ||
    !groupSubmitInfo.infoCategoryCode ||
    !groupSubmitInfo.infoCategoryLinkTo ||
    (groupSubmitInfo.infoCategoryLinkTo == LinkTo.policy &&
      lodash.isEmpty(groupSubmitInfo.policyIds))
  ) {
    handleMessageModal([
      {
        code: 'MSG_000537',
        content: formatMessageApi({ Label_COM_ErrorMessage: 'MSG_000537' }),
      },
    ]);
    return;
  }

  const submitData = {
    author: userId,
    businessCode,
    processInstanceId,
    taskId: taskId || lastTaskId,
    procActivityKey,
    category: groupSubmitInfo?.infoCategoryCode,
    effectiveDate: moment().valueOf(),
    expiryDate: moment('2999-12-31').valueOf(),
    content: groupSubmitInfo?.comment,
    informationLinkToList: [
      {
        linkToKey: LinkTo.case,
        linkToValue: classification?.caseNo,
      },
      {
        linkToKey: LinkTo.insured,
        linkToValue: lodash.get(classification, 'insuredId'),
      },
      ...lodash.get(groupSubmitInfo, 'policyIds', []).map((id) => ({
        linkToKey: LinkTo.policy,
        linkToValue: id,
      })),
    ].filter((i) => i.linkToKey === groupSubmitInfo?.infoCategoryLinkTo),
    status: 'P',
    defaultDate: 1,
    reason: null,
    caseCategory,
  };
  const response = yield call(saveInformation, submitData);
  if (lodash.get(response, 'success')) {
    yield addUpdateDate(caseNo);

    notification.success({
      message: formatMessageApi({
        Label_COM_Message: 'MSG_001138',
      }),
    });

    yield [
      put({
        type: 'getInfoHistory',
        payload: {
          caseNo: processInstanceId,
          activityCode,
          classification,
          inquiryBusinessNo,
        },
      }),
      put({
        type: 'clearSubmitInfo',
      }),
      /* -- auditLog -- */
      put({
        type: 'auditLogController/logInformation',
        payload: {
          action: Action.AddInformation,
          category: formatMessageApi({ DropDown_INF_Category: groupSubmitInfo.infoCategoryCode }),
          processInstanceId,
          taskId,
          procActivityKey: submitData.procActivityKey,
          businessNo: caseDetail?.businessNo,
          inquiryBusinessNo: caseDetail?.inquiryBusinessNo,
        },
      }),
    ];
  } else {
    const promptMessages = lodash.get(response, 'promptMessages', []);
    handleMessageModal(promptMessages);
  }
}
