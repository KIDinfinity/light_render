import { some, chain, isEmpty } from 'lodash';
import ButtonConfig from 'claim/pages/auditLog.button';
import AuditConfig from 'claim/pages/auditLog.config';
import { Action } from '../../Enum';
import { getDiff, removeRepeatSaveLog } from '../../Utils';

export default function* logButton({ payload }: any, { select, put }: any) {
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
      if (diffResponse?.length && auditlogContent?.length > 0) {
        yield put({
          type: 'addAuditLog',
          payload: {
            isSave: action === Action.Save,
            action: Action.Save,
            content: auditlogContent,
            activityKey,
          },
        });
        // 删除save操作后的confirm log，ps.下面isSave always false
        // if (action === Action.Confirm) {
        //   yield put({
        //     type: 'addAuditLog',
        //     payload: {
        //       isSave: action === Action.Save,
        //       action: Action.Confirm,
        //       content: diffResponse,
        //       activityKey,
        //     },
        //   });
        // }

        // 重置數據(数据有修改才重置，一直重置无法兼容AutoSave)
        yield put({
          type: 'saveClaimProcessData',
          payload: {
            taskId,
            claimProcessData: newClaimData,
          },
        });
        yield put({
          type: 'clearChangedFields',
        });
      }
    }
  }

  if (action !== Action.Save && action !== Action.Confirm) {
    yield put({
      type: 'addAuditLog',
      payload: {
        action,
        taskId: pTaskId,
        processInstanceId,
        activityKey,
        ...extraData,
      },
    });
  }
}
