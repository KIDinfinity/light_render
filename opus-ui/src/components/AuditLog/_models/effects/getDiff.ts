import { some, chain, isEmpty } from 'lodash';
import ButtonConfig from 'claim/pages/auditLog.button';
import AuditConfig from 'claim/pages/auditLog.config';
import { getDiff, removeRepeatSaveLog } from '../../Utils';

export default function* diff({ payload }: any, { select, put }: any) {
  const {
    action,
    taskId: pTaskId,
    processInstanceId,
    activityKey,
    isAuto,
    newProcessData,
    isTitleSection,
    ...extraData
  } = payload;
  if (!action) return;

  const isMatchDiff = some(ButtonConfig?.save, (el: string) => new RegExp(el, 'i').test(action));
  if (isMatchDiff) {
    const { taskId, changedFields, oldClaimData, currentController } = yield select(
      (state: any) => {
        const taskIdTemp = pTaskId || state?.processTask?.getTask?.taskId;
        return {
          taskId: taskIdTemp,
          changedFields: state.auditLogController?.changedFields,
          oldClaimData: state.auditLogController?.claimProcessData?.[taskIdTemp],
          currentController: state.auditLogController?.currentController,
        };
      }
    );
    const getDataForSave = chain(AuditConfig)
      .find({ namespace: currentController })
      .get('getDataForSave')
      .value();
    const saveData = yield put.resolve({
      type: `${currentController}/${getDataForSave}`,
    });
    // @ts-ignore
    const newClaimData = !isEmpty(newProcessData) ? newProcessData : saveData;
    if (currentController && getDataForSave && oldClaimData && newClaimData) {
      // 只有手动/自动save都计算
      const diffResponse: any = getDiff({
        oldClaimData,
        newClaimData,
        changedFields,
        currentController,
        activityKey,
        isTitleSection,
      });
      const auditlogContent = removeRepeatSaveLog(
        diffResponse,
        currentController,
        oldClaimData,
        newClaimData
      );
      return auditlogContent;
    }
  }
}
