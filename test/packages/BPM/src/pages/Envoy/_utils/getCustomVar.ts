import lodash from 'lodash';

const getReasonGroupVar = (reasonGroup: any) => lodash.pick(reasonGroup, ['envoyAuth']);

const getReasonDetailVar = (reasonDetail: any) => lodash.pick(reasonDetail, ['envoyAuth', 'claimNo', 'groupId', 'reasonIdx', 'displayConfig', 'defaultChannel', 'channelDataList', 'policy', 'attachment', 'payment', 'remark', 'delayLetter', 'define', 'letterCode'])

const getReasonReminderVar = (reminder: any) => lodash.pick(reminder, ['envoyAuth', 'claimNo', 'groupId', 'reasonCode', 'reasonIdx', 'startTime', 'period', 'reminderIdx', 'displayConfig', 'defaultChannel', 'channelDataList']);

export {
  getReasonGroupVar,
  getReasonDetailVar,
  getReasonReminderVar,
}
