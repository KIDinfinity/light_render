import { useContext, useEffect } from 'react';
import { filter } from 'rxjs/operators';
import lodash from 'lodash';
// @ts-ignore
import type { IData} from '@mc';
import { LifeCircle, PurposeCode, MCContext } from '@mc';

export const enterClaimPage = () => {
  const COMMON_TASK_PATH = '/process/task/detail/';
  const { pathname } = window.location;
  return pathname.indexOf(COMMON_TASK_PATH) !== -1;
};

export default ({ addMessage }: any) => {
  const { subject } = useContext(MCContext);

  useEffect(() => {
    const subscription = subject
      .pipe(
        filter(
          ({ lifeCircle, data }) =>
            lifeCircle === LifeCircle.OnMessage &&
            (data.type === PurposeCode.SmartCircle ||
              data.type === PurposeCode.A ||
              data.type === PurposeCode.B ||
              data.type === PurposeCode.ShareChequeSaved ||
              data.type === PurposeCode.ShareChequeVerified ||
              (data.type === PurposeCode.UD && !enterClaimPage()))
        )
      )
      .subscribe(({ data }: IData) => {
        if (lodash.isPlainObject(data) && data.id && data.content) {
          addMessage({
            id: data.id,
            description: data.content,
          });
        }
      });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return null;
};
