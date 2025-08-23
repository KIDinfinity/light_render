import { serialize as objectToFormData } from 'object-to-formdata';
import lodash from 'lodash';
import { getAuth } from '@/auth/Utils';
import { getTask } from '@/services/navigatorCaseManagementControllerService';
import { Category } from '../../Constant';

export default function* ({ payload }: any, { put, select }: any) {
  const { taskId, isSetEditable = false, isSetTaskNotEditable = false, taskDetail } = payload;
  if (!taskId) return;

  let detail = taskDetail;

  const commonAuthorityList = yield select(
    (state: any) => state.authController.commonAuthorityList
  );

  if (!taskDetail?.caseCategory) {
    const response = yield getTask(
      objectToFormData({
        taskId,
      })
    );
    detail = response?.resultData;
  }

  const taskView: boolean = getAuth(commonAuthorityList, {
    authorityCode: Category.taskView,
    caseCategory: detail?.caseCategory,
    activityCode: detail?.taskDefKey,
  });
  const taskDisabled = getAuth(commonAuthorityList, {
    authorityCode: 'UnviewableAllTaskDetail',
  })

  if (isSetEditable) {
    const taskEdit: boolean = getAuth(commonAuthorityList, {
      authorityCode: Category.taskEdit,
      caseCategory: detail?.caseCategory,
      activityCode: detail?.taskDefKey,
      assignee: detail?.assignee,
    });
    yield put({
      type: 'claimEditable/setTaskNotEditablePermission',
      payload: {
        taskNotEditablePermission: !taskEdit,
      },
    });
    
    if (isSetTaskNotEditable) {
      yield put({
        type: 'claimEditable/set',
        payload: lodash.pick(taskDetail, [
          'taskStatus',
          'taskDefKey',
          'submissionChannel',
          'procActOrder',
          'editFlag',
          'isEditPage',
        ]),
      });
    }
  }

  // eslint-disable-next-line consistent-return
  return taskView && !taskDisabled;
}
