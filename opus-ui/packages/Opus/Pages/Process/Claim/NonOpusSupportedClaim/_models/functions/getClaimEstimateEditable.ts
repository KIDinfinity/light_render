import { useMemo } from 'react';
import TaskStatus from 'basic/enum/TaskStatus';

import { LS, LSKey } from '@/utils/cache';
const getClaimEstimateEditable = ({ taskStatus, assignee }: any) => {
  return useMemo(() => {
    return taskStatus === TaskStatus.todo && LS.getItem(LSKey.CURRENTUSER)?.userId === assignee;
  }, [taskStatus, assignee]);
};

export default getClaimEstimateEditable;
