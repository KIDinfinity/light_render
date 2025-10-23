import { useEffect } from 'react';
import { filter } from 'rxjs/operators';
import type ExpandEvent from 'enum/ExpandEvent';
import useGetExpandSubject from 'basic/components/ExpandableContainer/hooks/useGetExpandSubject';
import lodash from 'lodash';

interface IParams {
  callback: Function;
  events: [ExpandEvent];
}

interface Data {
  data: {
    type: ExpandEvent;
  };
}

export default ({ callback, events }: IParams) => {
  const subject = useGetExpandSubject();

  useEffect(() => {
    const subscription = subject
      .pipe(
        filter(({ data }: Data) => {
          return lodash.includes(events, data.type);
        })
      )
      .subscribe(({ data }: Data) => {
        callback({ data });
      });
    return () => {
      subscription.unsubscribe();
    };
  }, [subject, callback, events]);
};
