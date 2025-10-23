import React from 'react';

import { Icon } from 'opus/Components/Antd';

import Search from './Search';

import { formatMessageApi } from '@/utils/dictFormatMessage';

import { ReactComponent as IconFilter } from 'opus/Assets/icon-filter.svg';
import { ReactComponent as CloseIcon } from 'packages/Opus/Assets/icon-close.svg';

import styles from './index.less';

const Main = ({ showFilter, setShowFilter }: any) => {
  return (
    <>
      {!!showFilter ? (
        <div className={styles.filterWrap}>
          <div className={styles.headerWrap}>
            <Icon component={IconFilter} className={styles.filterIcon} />
            <span className={styles.title}>{formatMessageApi({ Label_BPM_Button: 'Filter' })}</span>
            <Icon
              component={CloseIcon}
              className={styles.closeIcon}
              onClick={() => {
                setShowFilter(false);
              }}
            />
          </div>

          <Search />
        </div>
      ) : null}
    </>
  );
};

export default Main;
