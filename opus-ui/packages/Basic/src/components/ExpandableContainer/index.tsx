import React, { useState, useEffect, useCallback } from 'react';
import lodash from 'lodash';
import useGetExpandSubject from 'basic/components/ExpandableContainer/hooks/useGetExpandSubject';
import useAutoResetExpandClientDetail from 'process/NB/ManualUnderwriting/_hooks/useAutoResetExpandClientDetail';
import ExpandEvent from 'enum/ExpandEvent';
import { filter } from 'rxjs/operators';

export default ({ children, sectionId }: any) => {
  const [expendStatus, setStatus] = useState(false);
  const subject = useGetExpandSubject();
  useEffect(() => {
    const subscription = subject
      .pipe(
        filter(({ data }: any) => {
          return [
            ExpandEvent.COLLAPSE_ALL,
            ExpandEvent.EXPAND_ALL,
            ExpandEvent.EXPAND_TARGET_SECTIONS,
          ].includes(data.type);
        })
      )
      .subscribe(({ data }: any) => {
        if (data.type === ExpandEvent.EXPAND_ALL) {
          setStatus(true);
        }
        if (data.type === ExpandEvent.COLLAPSE_ALL) {
          useAutoResetExpandClientDetail({expendStatus: false})
          setStatus(false);
        }
        if (
          data.type === ExpandEvent.EXPAND_TARGET_SECTIONS &&
          lodash.includes(data.sectionIds, sectionId)
        ) {
          setStatus(true);
        }
      });
    return () => {
      subscription.unsubscribe();
    };
  }, [subject, setStatus, sectionId]);

  const setExpendStatus = useCallback(
    (status: boolean) => {
      setStatus(status);
      if (status) {
        subject.next({
          data: {
            type: ExpandEvent.EXPAND_SINGLE_SECTION,
            sectionId,
          },
        });
      }
    },
    [subject, sectionId]
  );
  return (
    <>
      {React.cloneElement(children, {
        expendStatus,
        setExpendStatus,
      })}
    </>
  );
};
