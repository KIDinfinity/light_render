import lodash from 'lodash';
import { useEffect } from 'react';
import { LS, LSKey } from '@/utils/cache';
import getRequestUrl from '@/utils/request/getRequestUrl';
import { saveEditLog, deleteEditLog } from '@/services/caseMgntTaskControllerService';

export default ({ taskDetail, taskId }: any) => {
  const { caseNo, assignee } = lodash.pick(taskDetail, ['caseNo', 'assignee']);
  const userId = (() => {
    const user = LS.getItem(LSKey.CURRENTUSER);
    return user?.userId;
  })();

  const DeleteEditLog = async () => {
    if (assignee === userId) {
      const Url = getRequestUrl({
        url: `/api/case/mgnt/task/deleteEditLog?taskId=${taskId}`,
        option: '',
      });
      navigator.sendBeacon(Url);
    }
  };
  window.addEventListener('unload', DeleteEditLog, false);

  useEffect(() => {
    (async () => {
      if (assignee === userId) {
        saveEditLog({
          taskId,
          caseNo,
          userId,
        });
      }
    })();
    return () => {
      (async () => {
        if (assignee === userId) {
          await deleteEditLog({
            taskId,
          });
        }
      })();
    };
  }, []);
};
