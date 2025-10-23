import lodash from 'lodash';
// import { safeParseUtil } from '@/utils/utils';
// import getSortModuleArr from 'bpm/pages/Envoy/_utils/getSortModuleArr';
import {
  ETaskStatus,
  EAllowActions,
  EOptReasonStatus,
  EReasonStatus,
  EReminderStatus,
  EChannelType,
} from 'bpm/pages/Envoy/enum';

// const notAuth = (groupAuth: any, auth: any, authType: TAuthType) => {
//   return !groupAuth || !auth[authType];
// };
const notAuth = (globalAuth: boolean, selfAuth: boolean) => !globalAuth || !selfAuth;

const notTodoOrPending = (taskStatus: string) =>
  taskStatus !== ETaskStatus.TODO && taskStatus !== ETaskStatus.PENDING;

const notAddEnvoy = ({ taskStatus, globalAuth }: { taskStatus: string; globalAuth: boolean }) => {
  return notTodoOrPending(taskStatus) || notAuth(globalAuth, true);
};

const isDraftReason = (status: string) => status === EReasonStatus.DRAFT;

const isActiveReason = (status: string) => status === EReasonStatus.ACTIVE;

const notActiveReason = (status: string) => status !== EReasonStatus.ACTIVE;

const notDraftAndActive = (status: string) =>
  status !== EReasonStatus.DRAFT && status !== EReasonStatus.ACTIVE;

const notAuthOrDraftReason = ({
  globalAuth,
  selfAuth,
  status,
}: {
  globalAuth: boolean;
  selfAuth: boolean;
  status: string;
}) => {
  return notAuth(globalAuth, selfAuth) || !isDraftReason(status);
};

const notAuthOrActiveReason = ({
  globalAuth,
  selfAuth,
  status,
}: {
  globalAuth: boolean;
  selfAuth: boolean;
  status: string;
}) => {
  return notAuth(globalAuth, selfAuth) || notActiveReason(status);
};

const notStatusSel = ({
  globalAuth,
  selfAuth,
  optArr,
  status,
}: {
  groupAuth: any;
  auth: any;
  optArr: string[];
  status: string;
}): boolean => {
  return (
    notAuth(globalAuth, selfAuth) || !lodash.get(optArr, 'length') || notDraftAndActive(status)
  );
};

const notSetResolve = ({
  globalAuth,
  selfAuth,
  envoyData,
  status,
  optItem,
}: {
  globalAuth: boolean;
  selfAuth: boolean;
  envoyData: any;
  status: string;
  optItem: string;
}): boolean => {
  const isOptDraftAndResolve = isDraftReason(status) && optItem === EOptReasonStatus.RESOLVE;
  const notReminder = !lodash.some(envoyData, (item: any) => item?.reasonReminders?.length);
  const notDraftAndIsSave = !isDraftReason(status) && optItem === EAllowActions.SAVE;
  return (
    notAuth(globalAuth, selfAuth) || isOptDraftAndResolve || (notDraftAndIsSave && notReminder)
  );
};

const notCurrentTaskOfGroup = ({
  globalAuth,
  selfAuth,
  envoyTaskId,
  envoyData,
}: {
  globalAuth: boolean;
  selfAuth: boolean;
  envoyTaskId: string;
  envoyData: any;
}) => {
  const { id, status, taskId: currentGroupTaskId, isNew } = lodash.pick(envoyData, [
    'id',
    'status',
    'taskId',
    'isNew',
  ]);
  // 前端新添加的group，没有id，此时还没有真正添加，只有选择了具体group之后，才会发送请求给后端，添加这个envoy, 对于新添加的，不做disabled的判断
  // opus会添加id，所以添加一个isNew字段代替，预计入库之后就会丢失该字段
  const notNewGroup = !lodash.isEmpty(id) && !isNew;
  const notCurrentGroupTaskId =
    !lodash.isEmpty(currentGroupTaskId) && currentGroupTaskId !== envoyTaskId;

  return (
    notNewGroup &&
    (notAuthOrDraftReason({
      globalAuth,
      selfAuth,
      status,
    }) ||
      notCurrentGroupTaskId)
  );
};

const notSendEnvoy = ({
  globalAuth,
  selfAuth,
  envoyData,
}: {
  globalAuth: boolean;
  selfAuth: boolean;
  envoyData: any;
}) => {
  const { status, reasonDetails, sendControl } = lodash.pick(envoyData, [
    'status',
    'reasonDetails',
    'sendControl',
  ]);
  const notSelChannel = lodash.some(reasonDetails, (reason: any) => {
    const channelDataList = lodash.get(reason, 'channelDataList');
    return (
      channelDataList?.length && !lodash.some(channelDataList, (channel: any) => channel?.enable)
    );
  });
  const hasEmptyRemark = lodash.some(reasonDetails, (reason: any) =>
    lodash.some(
      lodash.get(reason, 'channelDataList'),
      (channel: any) =>
        channel?.enable &&
        channel?.channel === EChannelType.REMARK &&
        lodash.isEmpty(lodash.get(channel, 'content.content.value'))
    )
  );
  const notSend = lodash.isBoolean(sendControl) && !sendControl;
  return (
    notAuthOrDraftReason({
      globalAuth,
      selfAuth,
      status,
    }) ||
    notSelChannel ||
    notSend ||
    hasEmptyRemark
  );
};

const notActivateOrIsEnable = ({
  remindersData,
  enableReminder,
  reminderData,
}: {
  auth?: any;
  remindersData: any;
  enableReminder: boolean;
  reminderData: any;
}) => {
  // 注意：这个是reminder的排序（后端会排好再给前端），是从1开始计数的。
  const reminderSequence = lodash.get(reminderData, 'reminderSequence');
  const isFirst = reminderSequence === 1;
  let preIsSent: boolean = true;
  if (!isFirst) {
    const reminderIdx = reminderSequence - 1;
    const preReminderStatus = lodash.get(remindersData, `[${reminderIdx - 1}].status`);
    const triggeredStatusArr = [EReminderStatus.SENT, EReminderStatus.MISFIRE];
    preIsSent = lodash.includes(triggeredStatusArr, preReminderStatus);
  }
  const status = lodash.get(reminderData, 'status');
  const isActivate = preIsSent && status === EReminderStatus.WAIT;
  return !isActivate || !enableReminder;
};

const notAuthOrDraftOrWait = ({
  globalAuth,
  selfAuth,
  enableReminder,
  reminderData,
}: {
  globalAuth: boolean;
  selfAuth: boolean;
  enableReminder: boolean;
  reminderData: any;
}): boolean => {
  const status: string = lodash.get(reminderData, 'status');
  const notDraftOrWait: boolean =
    status !== EReminderStatus.DRAFT && status !== EReminderStatus.WAIT;
  return notAuth(globalAuth, selfAuth) || notDraftOrWait || !enableReminder;
};

const notAuthOrActivate = ({
  globalAuth,
  selfAuth,
  remindersData,
  enableReminder,
  reminderData,
}: {
  globalAuth: boolean;
  selfAuth: boolean;
  remindersData: any;
  enableReminder: boolean;
  reminderData: any;
}) => {
  return (
    notAuth(globalAuth, selfAuth) ||
    notActivateOrIsEnable({
      remindersData,
      enableReminder,
      reminderData,
    })
  );
};

const notSendReminder = ({
  globalAuth,
  selfAuth,
  remindersData,
  enableReminder,
  reminderData,
}: {
  globalAuth: boolean;
  selfAuth: boolean;
  remindersData: any;
  enableReminder: boolean;
  reminderData: any;
}) => {
  // 注意：这个是reminder的排序（后端会排好再给前端），是从1开始计数的。
  const { channelDataList, displayConfig } = lodash.pick(reminderData, [
    'channelDataList',
    'displayConfig',
  ]);
  const notSelChannel =
    channelDataList?.length && !lodash.some(channelDataList, (channel: any) => channel?.enable);
  const {
    simpleSend = {
      editable: true,
      visible: true,
    },
  } = displayConfig;
  const notEditOrVisible = !simpleSend.editable || !simpleSend.visible;
  return (
    notAuthOrActivate({
      globalAuth,
      selfAuth,
      remindersData,
      enableReminder,
      reminderData,
    }) ||
    notSelChannel ||
    notEditOrVisible
  );
};

export {
  notAddEnvoy,
  isDraftReason,
  isActiveReason,
  notAuth,
  notActiveReason,
  notAuthOrDraftReason,
  notAuthOrActiveReason,
  notStatusSel,
  notSetResolve,
  notCurrentTaskOfGroup,
  notSendEnvoy,
  notActivateOrIsEnable,
  notAuthOrDraftOrWait,
  notAuthOrActivate,
  notSendReminder,
};
