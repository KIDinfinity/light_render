import { some, chain, isEmpty } from 'lodash';
import ButtonConfig from 'claim/pages/auditLog.button';
import AuditConfig from 'claim/pages/auditLog.config';
import { Action } from '../../Enum';
import { getDiff } from '../../Utils';

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


    if (currentController && getDataForSave && !isAuto && oldClaimData && newClaimData) {
      // 只有手动点save才计算
      const diffResponse: any = getDiff({
        oldClaimData,
        newClaimData,
        changedFields,
        currentController,
        activityKey,
        isTitleSection,
      });
      if (diffResponse?.length) {
        yield put({
          type: 'addAuditLog',
          payload: {
            isSave: action === Action.Save,
            action: Action.Save,
            content: diffResponse,
            activityKey,
          },
        });
        if(action === Action.Confirm){
          yield put({
            type: 'addAuditLog',
            payload: {
              isSave: action === Action.Save,
              action: Action.Confirm,
              content: diffResponse,
              activityKey,
            },
          });
        }

      }
      // 重置數據
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
