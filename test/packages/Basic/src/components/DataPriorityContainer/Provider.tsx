import React, { useState, useEffect, useMemo } from 'react';
import { Subject } from 'rxjs';
import Context from './Context';
import { filter } from 'rxjs/operators';
import DataPriorityEvent from 'enum/DataPriorityEvent';
import DataPriority from 'enum/DataPriority';

const { Provider } = Context;

export default ({ children }: any) => {
  const subject = useMemo(() => {
    return new Subject();
  }, []);
  const [dataPriority, setDataPriority] = useState(DataPriority.HIGH);

  useEffect(() => {
    const subscription = subject
      .pipe(
        filter(({ data }: any) => {
          return [
            DataPriorityEvent.HIGH_PRIORITY_LOADED,
            DataPriorityEvent.MEDIUM_PRIORITY_LOADED,
            DataPriorityEvent.RESET,
          ].includes(data.type);
        })
      )
      .subscribe(({ data }: any) => {
        if (data.type === DataPriorityEvent.RESET) {
          setDataPriority(DataPriority.HIGH);
        }
        if (data.type === DataPriorityEvent.HIGH_PRIORITY_LOADED) {
          setDataPriority(DataPriority.MEDIUM);
        }
      });
    return () => {
      subscription.unsubscribe();
    };
  }, [subject]);
  return <Provider value={{ subject, dataPriority, setDataPriority }}>{children}</Provider>;
};
