import type { Dispatch } from 'redux';
import { getAutoActivityValueByClaimNo } from '@/services/bpmProcessTaskService';
import type { CaseCategory } from '../../enum';
import { CaseStatus, CaseType } from '../../enum';
import lodash from 'lodash';

interface IProps {
  claimNo: string;
  caseCategory: CaseCategory;
  caseStatus: CaseStatus;
  dispatch: Dispatch;
  caseType: string;
}

const jumpToHistory = ({ caseCategory, claimNo, taskId, caseNo }: any) => {
  window.open(
    `/opus/case/history?caseCategory=${caseCategory}&claimNo=${claimNo}&businessNo=${claimNo}${
      taskId ? '&taskId=' + taskId : ''
    }${caseNo ? '&caseNo=' + caseNo : ''}`,
    '_blank'
  );
};

const jumpToTask = async ({ dispatch, claimNo, caseCategory }: any) => {
  const taskId = await dispatch({
    type: 'insured360/getLastTask',
    payload: {
      claimNo,
      caseCategory,
    },
  });

  if (taskId) {
    window.open(`/opus/process/task/detail/${taskId}`, '_blank');
  }
};

const map = {
  [CaseType.RCS]: {
    [CaseStatus.InProgress]: {
      url: jumpToTask,
    },
    [CaseStatus.Close]: {
      url: jumpToHistory,
    },
  },
  [CaseType.KLIP]: {
    [CaseStatus.Close]: {
      url: jumpToHistory,
    },
  },
};

const jump = async ({ claimNo, caseCategory, dispatch, caseType, caseStatus }: IProps) => {
  if (caseStatus !== CaseStatus.Close && !lodash.startsWith(claimNo, 'DL')) {
    getAutoActivityValueByClaimNo({ businessNo: claimNo }).then((result) => {
      if (result?.autoActivity)
        jumpToHistory({
          caseCategory,
          claimNo,
          taskId: result?.taskId,
          caseNo: result?.processInstanceId,
        });
      else jumpToTask({ dispatch, claimNo, caseCategory });
    });
  } else {
    jumpToHistory({ caseCategory, claimNo, dispatch });
  }
};

export default jump;
