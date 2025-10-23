import React, { useState, useEffect, useMemo } from 'react';
import { Subject } from 'rxjs';
import Context from './Context';
import { filter } from 'rxjs/operators';
import ExpandEvent from 'enum/ExpandEvent';
import ExpandStatus from 'enum/ExpandStatus';

const { Provider } = Context;

export default ({ children }: any) => {
  const subject = useMemo(() => {
    return new Subject();
  }, []);
  const [expandStatus, setTopLevelExpand] = useState(ExpandStatus.COLLAPSE_ALL);

  useEffect(() => {
    const subscription = subject
      .pipe(
        filter(({ data }: any) => {
          return [ExpandEvent.COLLAPSE_ALL, ExpandEvent.EXPAND_ALL].includes(data.type);
        })
      )
      .subscribe(({ data }: any) => {
        if (data.type === ExpandEvent.EXPAND_ALL) {
          setTopLevelExpand(ExpandStatus.EXPAND_ALL);
        }
        if (data.type === ExpandEvent.COLLAPSE_ALL) {
          setTopLevelExpand(ExpandStatus.COLLAPSE_ALL);
        }
      });
    return () => {
      subscription.unsubscribe();
    };
  }, [subject]);
  return <Provider value={{ subject, expandStatus }}>{children}</Provider>;
};
