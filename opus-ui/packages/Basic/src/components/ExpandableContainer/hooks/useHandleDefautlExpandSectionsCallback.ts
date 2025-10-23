import { useCallback } from 'react';
import useGetExpandSubject from 'basic/components/ExpandableContainer/hooks/useGetExpandSubject';
import ExpandEvent from 'enum/ExpandEvent';
import lodash from 'lodash';

export default () => {
  const subject = useGetExpandSubject();
  return useCallback(
    ({ sectionIds }: any) => {
      if (!lodash.isEmpty(sectionIds)) {
        subject.next({
          data: {
            type: ExpandEvent.EXPAND_TARGET_SECTIONS,
            sectionIds,
          },
        });
      }
    },
    [subject]
  );
};
