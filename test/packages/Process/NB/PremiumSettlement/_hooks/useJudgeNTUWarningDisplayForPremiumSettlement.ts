import { useMemo } from 'react';
import lodash from 'lodash';
import TaskStatus from 'enum/TaskStatus';

export default ({ taskDetail }: any) => {
  return useMemo(() => {
    return (
      lodash.includes([TaskStatus.todo, TaskStatus.pending], taskDetail.taskStatus) &&
      taskDetail?.notWait === true &&
      taskDetail?.rejected === true
    );
  }, [taskDetail?.taskStatus, taskDetail?.notWait, taskDetail?.rejected]);
};
