import { useContext, useEffect } from 'react';
import { useDispatch } from 'dva';
import { filter } from 'rxjs/operators';
import type { IData} from '@mc/index';
import { LifeCircle, PurposeCode, MCContext } from '@mc/index';

export default () => {
  const dispatch = useDispatch();
  const { subject }: any = useContext(MCContext);

  useEffect(() => {
    const subscription = subject
      .pipe(
        filter(({ lifeCircle, data }: IData) => {
          return lifeCircle === LifeCircle.OnMessage && data.type === PurposeCode.ChatStatus;
        })
      )
      .subscribe(({ data }: IData) => {
        dispatch({
          type: 'userContactController/changeContactListByUserId',
          payload: {
            userId: data?.userId,
            status: data?.state,
          },
        });
      });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return null;
};
