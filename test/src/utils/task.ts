import { history } from 'umi';
import lodash from 'lodash';
import { checkSnapshot } from '@/services/bpmProcessTaskService';
import { serialize as objectToFormData } from 'object-to-formdata';
import handleMessageModal from '@/utils/commonMessage';
import { LS, LSKey } from '@/utils/cache';

export const goToTaskDetail = ({ taskId, reload }: any) => {
  const url = `/process/task/detail/${taskId}`;
  if (reload) {
    window.location.href = url;
  } else {
    history.push(url);
  }
};

/**
 * task 进行提交等操作之后返回上一级 由于router上一级可能是task detail 所以新建这个function
 */
export const taskGoBack = () => {
  const taskPrePage = LS.getItem(LSKey.TASK_PRE_HISTORY, false);
  if (taskPrePage) {
    history.push(taskPrePage);
  } else {
    history.back();
  }
};

/**
 * task页点击返回之后回到上一级 由于router上一级可能是proposal change页 所以新建这个function
 */
export const taskGoBackNotProposal = () => {
  const { pathname } = window.location;
  const proposalPrePage = LS.getItem(LSKey.PROPOSAL_PRE_HISTORY, false);
  if (proposalPrePage) {
    if (pathname !== proposalPrePage) {
      history.push(proposalPrePage);
    } else {
      taskGoBack();
    }
  } else {
    history.push('/navigator');
  }
};

/**
 * 检查快照
 * @param {Number} object.initialDataInherit 是否需要检查快照
 * @param {String} object.taskId taskId
 */
export const snapshotCheck = async ({ initialDataInherit, processInstanceId }: any) => {
  if (initialDataInherit) {
    const response = await checkSnapshot(
      objectToFormData({
        taskId: processInstanceId,
      })
    );
    const { success, promptMessages = [] } = lodash.pick(response, ['success', 'promptMessages']);
    if (!success) {
      handleMessageModal(promptMessages);
    }
  }
};
