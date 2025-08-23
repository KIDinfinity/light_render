import { useContext, useEffect } from 'react';
import { useDispatch } from 'dva';
import { filter } from 'rxjs/operators';
import type { IData} from '@mc';
import { LifeCircle, PurposeCode, MCContext } from '@mc';

export const enterClaimPage = () => {
  const COMMON_TASK_PATH = '/claim/task/detail/';
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
          ({ lifeCircle, data }) =>
            lifeCircle === LifeCircle.OnMessage &&
            (data.type === PurposeCode.SmartCircle ||
              (data.type === PurposeCode.UD && enterClaimPage()))
        )
      )
      .subscribe(({ data }: IData) => {
        dispatch({
          type: 'udMessageController/receiveUDMessage',
          payload: data,
        });
      });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return null;
};
