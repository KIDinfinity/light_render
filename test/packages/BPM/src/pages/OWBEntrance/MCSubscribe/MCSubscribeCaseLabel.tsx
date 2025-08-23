import { useContext, useEffect } from 'react';
import { filter } from 'rxjs/operators';
import type { IData} from '@mc';
import { LifeCircle, PurposeCode, MCContext } from '@mc';
import context from '../Context/context';

export default () => {
  const { subject } = useContext(MCContext);
  const { dispatch: reducerDispatch } = useContext(context);

  useEffect(() => {
    const subscription = subject
      .pipe(
        filter(
          ({ lifeCircle, data }) =>
            lifeCircle === LifeCircle.OnMessage && data.type === PurposeCode.caseLabel
        )
      )
      .subscribe(({}: IData) => {
        if (reducerDispatch) {
          reducerDispatch({
            type: 'setIsRefresh',
            payload: new Date().getTime(),
          });
        }
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [reducerDispatch, subject]);

  return null;
};
