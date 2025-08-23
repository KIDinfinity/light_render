import React, { useEffect, useState } from 'react';
import { useDispatch } from 'dva';
import lodash from 'lodash';
import PageLoading from '@/components/PageLoading';
import Exception403 from '@/pages/Exception/403';
import { useParams } from 'umi';

const AuthEntranceLayoutDetail = ({
  taskDetail,
  loading: loadingOfTaskDetail,
  children,
  ...props
}: any) => {
  const params = useParams();
  const taskId = params?.taskId || lodash.last(window.location.pathname.split('/'));
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [authorized, setTaskAuthorized] = useState(false);
  useEffect(() => {
    (async () => {
      if (lodash.isBoolean(loadingOfTaskDetail) && loadingOfTaskDetail) {
        return;
      }
      const TaskAuthorized: boolean = await dispatch({
        type: 'authController/getTaskAuth',
        payload: {
          taskId,
          isSetEditable: true,
          isSetTaskNotEditable: true,
          taskDetail,
        },
      });
      setTaskAuthorized(TaskAuthorized);
      setLoading(false);
    })();
  }, [taskId, loadingOfTaskDetail]);

  if (loading || loadingOfTaskDetail) {
    return <PageLoading />;
  }
  if (!authorized) {
    return <Exception403 />;
  }

  return <>{children}</>;
};

export default (props: any) => <AuthEntranceLayoutDetail {...props} />;
