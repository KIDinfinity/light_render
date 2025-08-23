import { useCallback } from 'react';
import useGetExpandSubject from 'basic/components/ExpandableContainer/hooks/useGetExpandSubject';
import ExpandEvent from 'enum/ExpandEvent';
import useGetExpandStatus from 'basic/components/ExpandableContainer/hooks/useGetExpandStatus';
import ExpandStatus from 'enum/ExpandStatus';

export default () => {
  const subject = useGetExpandSubject();
  const expandStatus = useGetExpandStatus();
  return useCallback(() => {
    if (expandStatus === ExpandStatus.EXPAND_ALL) {
      subject.next({
        data: {
          type: ExpandEvent.COLLAPSE_ALL,
        },
      });
    }
    if (expandStatus === ExpandStatus.COLLAPSE_ALL) {
      subject.next({
        data: {
          type: ExpandEvent.EXPAND_ALL,
        },
      });
    }
  }, [expandStatus, subject]);
};
