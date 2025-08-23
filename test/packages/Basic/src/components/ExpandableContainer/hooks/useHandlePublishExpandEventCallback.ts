import { useCallback } from 'react';
import useGetExpandSubject from 'basic/components/ExpandableContainer/hooks/useGetExpandSubject';

export default () => {
  const subject = useGetExpandSubject();
  return useCallback(
    ({ type, payload }) => {
      subject.next({
        data: {
          type,
          ...payload,
        },
      });
    },
    [subject]
  );
};
