import { includes, upperFirst } from 'lodash';
import ButtonConfig from 'claim/pages/auditLog.button';

export default async ({
  dispatch,
  buttonCode,
  isAuto,
  taskId,
  caseNo,
  activityKey,
  ...extraData
}: any) => {
  if (includes(ButtonConfig.ignore, buttonCode) || !buttonCode) {
    return;
  }

  await dispatch({
    type: 'auditLogController/logButton',
    payload: {
      action: upperFirst(buttonCode),
      taskId,
      isAuto,
      processInstanceId: caseNo,
      activityKey,
      extraData,
    },
  });
};
