import { useContext, useEffect } from 'react';
import { useDispatch } from 'dva';
import { filter } from 'rxjs/operators';
import type { IData} from '@mc';
import { LifeCircle, PurposeCode, MCContext } from '@mc';

export const enterClaimPage = () => {
  const COMMON_TASK_PATH = '/process/task/detail/';
  const { pathname } = window.location;
  return pathname.indexOf(COMMON_TASK_PATH) !== -1;
};

export default () => {
  const dispatch = useDispatch();
  const { subject } = useContext(MCContext);

  useEffect(() => {
    const subscription = subject
      .pipe(
        filter(
          ({ lifeCircle, data }: IData) =>
            lifeCircle === LifeCircle.OnMessage &&
            (data.type === PurposeCode.SmartCircle ||
              (data.type === PurposeCode.UD && !enterClaimPage()))
        )
      )
      .subscribe(() => {
        // 更新列表
        dispatch({
          type: 'smartCircleNotification/messageList',
          payload: {
            currentPage: 1,
            isUpdate: true,
            isBackToTop: true,
          },
        });
      });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return null;
};
