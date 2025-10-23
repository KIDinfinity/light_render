import { useMemo } from 'react';
import { useSelector } from 'dva';
import { LS, LSKey } from '@/utils/cache';
import TaskDefKey from 'basic/enum/TaskDefKey';
import TaskStatus from 'basic/enum/TaskStatus';

export default function useGetFollowUpTaskEditable() {
  const { activityKey, taskNotEditable, taskStatus, assignee } = useSelector((state: any) => ({
    activityKey: state?.opusNonOpusClaimManagement?.taskDetail?.activityKey,
    taskNotEditable: state?.claimEditable?.taskNotEditable,
    taskStatus: state?.opusNonOpusClaimManagement?.taskDetail?.taskStatus,
    assignee: state?.opusNonOpusClaimManagement?.taskDetail?.assignee,
  }));
  const currentUser = LS.getItem(LSKey.CURRENTUSER)?.userId;

  return useMemo(() => {
    return (
      !taskNotEditable ||
      ([TaskDefKey.JP_CLM_ACT004, TaskDefKey.JP_CLM_ACT005].includes(activityKey) &&
        taskStatus !== TaskStatus.completed &&
        currentUser === assignee)
    );
  }, [activityKey, assignee, currentUser, taskNotEditable, taskStatus]);
}
