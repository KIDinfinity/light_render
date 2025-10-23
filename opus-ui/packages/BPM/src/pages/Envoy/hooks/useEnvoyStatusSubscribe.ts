import { useContext, useEffect } from 'react';
import lodash from 'lodash';
import type { IData} from '@mc/index';
import { PurposeCode, MCContext } from '@mc/index';
import { filter } from 'rxjs/operators';

interface Iprops {
  callback: Function;
}

export default ({ callback }: Iprops) => {
  const { subject } = useContext(MCContext);
  useEffect(() => {
    const subscription = subject
      .pipe(
        filter(({ data }: IData) => {
          return data?.type === PurposeCode.MWReLoadBizDataSkipSnapshot;
        })
      )
      .subscribe(({ data }: IData) => {
        if (lodash.isFunction(callback)) {
          callback(data?.data);
        }
      });
    return () => {
      subscription?.unsubscribe();
    };
  }, [callback]);
};
