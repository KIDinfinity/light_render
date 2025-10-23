import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Icon } from 'opus/Components/Antd';
import Buttons from 'opus/Components/Buttons';
import { ReactComponent as dashboard } from 'packages/Opus/Assets/icon-dashboard.svg';
import React, { useCallback } from 'react';
import styles from './index.less';

const Main = ({
  containerRef,
  handleRessign,
  showReassign,
  // exportLoading,
  // handleExport,
  handleFilter,
  reassignBtnDisabled,
}: any) => {
  const onFilterClick = useCallback(() => {
    const container = containerRef?.current;
    const opusLayout = document.getElementById('opusLayout');

    handleFilter();

    if (container && opusLayout) {
      const rect = (container as HTMLElement).getBoundingClientRect();
      const layoutRect = (opusLayout as HTMLElement).getBoundingClientRect();

      opusLayout.scrollTo({
        top: opusLayout.scrollTop + (rect.top - layoutRect.top) - 10, // 留出上边距
        behavior: 'smooth',
      });
    }
  }, [containerRef, handleFilter]);

  return (
    <div className={styles.topContent}>
      <div className={styles.titleWrap}>
        <Icon component={dashboard} className={styles.icon} />
        <span className={styles.title}>{formatMessageApi({ Label_COM_Opus: 'AllCases' })}</span>
      </div>

      <div className={styles.buttonWrap}>
        <Buttons.Filter handleClick={onFilterClick} />
        {/* <Buttons.Export
          loading={exportLoading}
          handleClick={() => {
            handleExport();
          }}
        /> */}

        {showReassign && (
          <Buttons.Reassign
            disabled={reassignBtnDisabled}
            handleClick={() => {
              handleRessign();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Main;
