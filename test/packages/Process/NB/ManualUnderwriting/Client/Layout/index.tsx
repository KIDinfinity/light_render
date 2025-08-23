import React, { useEffect, useRef, useState } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import classnames from 'classnames';
import useRegisteredSlots from 'basic/hooks/useRegisteredSlots';
import useFilterAuthorisedSignatoryClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useFilterAuthorisedSignatoryClientDetailList';
import useGetIsClientSelectHidden from 'process/NB/ManualUnderwriting/_hooks/useGetIsClientSelectHidden';
import Mode from 'process/NB/ManualUnderwriting/Enum/Mode';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import styles from './index.less';

export default ({ children, mode, expendStatus }: any) => {
  const list = useFilterAuthorisedSignatoryClientDetailList();
  const slots = useRegisteredSlots({ children });
  const [detailHeight, setDetailHeight] = useState(0);
  const expendedClient = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.expendedClient,
    shallowEqual
  );
  const detailRef = useRef(null);
  const isHiddenSelectModel = useGetIsClientSelectHidden({
    expendStatus,
  });
  const resizeObserver = new ResizeObserver((entries: any) => {
    for (const entry of entries) {
      setDetailHeight(entry.contentRect.height - 24);
    }
  });
  useEffect(() => {
    if (detailRef !== null) {
      detailRef.current && resizeObserver.observe(detailRef.current);
    }
    return () => {
      detailRef.current && resizeObserver.unobserve(detailRef.current);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div
        className={classnames(styles.clientDetail, {
          [styles.minorityExpandedClientDetail]:
            (list?.length === 1 && (expendedClient || mode === Mode.Edit)) ||
            (list?.length > 1 && list?.length < 6),
          [styles.minorityNotExpandedClientDetail]:
            list?.length === 1 && !expendedClient && mode === Mode.Show,
          [styles.vastClientDetail]: list?.length >= 6,
        })}
      >
        <div ref={detailRef}>{slots.get('ClientDetail')}</div>
      </div>
      <div
        className={classnames(styles.clientSelect, styles[mode], {
          [styles.hidden]: isHiddenSelectModel,
          [styles.minorityClientSelect]: list?.length > 0 && list?.length < 6,
          [styles.vastClientSelect]: list?.length >= 6,
        })}
      >
        <div style={mode === Mode.Show ? { maxHeight: detailHeight, overflow: 'hidden auto' } : {}}>
          {slots.get('ClientSelect')}
        </div>
      </div>
    </div>
  );
};
