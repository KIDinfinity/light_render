import type { Dispatch } from 'redux';
import lodash from 'lodash';
import type { CaseCategory} from '../../enum';
import { CaseStatus, CaseType } from '../../enum';

interface IProps {
  claimNo: string;
  caseCategory: CaseCategory;
  caseStatus: CaseStatus;
  dispatch: Dispatch;
  caseType: string;
}

const jumpToHistory = ({ caseCategory, claimNo, partyId, customerType }: any) => {
  window.open(
    `/claim/history?caseCategory=${caseCategory}&claimNo=${claimNo}&partyId=${partyId}&customerType=${customerType}&businessNo=${claimNo}`,
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
    window.open(`/process/task/detail/${taskId}`, '_blank');
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

const jump = async ({
  claimNo,
  caseCategory,
  dispatch,
  caseType,
  caseStatus,
  partyId,
  customerType,
}: IProps) => {
  const handler = map?.[caseType]?.[caseStatus]?.url;
  if (lodash.isFunction(handler))
    handler({ caseCategory, claimNo, dispatch, partyId, customerType });
};

export default jump;
