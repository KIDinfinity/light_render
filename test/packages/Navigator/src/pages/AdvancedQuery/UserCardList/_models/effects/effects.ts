import lodash from 'lodash';
import { history } from 'umi';
import bpmProcessInstanceService from '@/services/bpmProcessInstanceService';

interface IEffects {
  call: Function;
  select: Function;
}

export default {
  *goTaskPage({ payload }: any, { call, select }: IEffects) {
    const currentUserId = yield select((state: any) => state.user.currentUser.userId);
    const { userId } = payload;
    let { taskId } = payload;
    // 如果有taskId，说明已经有case在处理，直接跳转至对应页面，如果没有taskId则需要创建流程，然后再进入task页面。
    if (!taskId) {
      const response = yield call(bpmProcessInstanceService.startSyncProcessInstance, {
        caseCategory: 'BP_UP_CTG001',
        variables: {
          BP_UP_CTG001_USERID: userId,
          applicant: currentUserId,
        },
      });
      taskId = lodash.get(response, 'resultData.taskId', null);
    }
    history.push(`/process/task/detail/${taskId}`);
  },
};
