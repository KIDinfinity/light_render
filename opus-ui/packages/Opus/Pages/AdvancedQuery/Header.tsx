import { useSelector, useDispatch } from 'dva';

import { Icon } from 'opus/Components/Antd';

import Buttons from 'opus/Components/Buttons';

import { formatMessageApi } from '@/utils/dictFormatMessage';

import { ReactComponent as IconDocument } from 'opus/Assets/icon-document.svg';

import React from 'react';
import styles from './index.less';

const Main = ({ showExport }: any) => {
  const dispatch = useDispatch();

  const loading = useSelector(
    (state: any) => state.loading.effects['opusAdvancedSearch/getExport']
  );
  return (
    <div className={styles.topContent}>
      <div className={styles.titleWrap}>
        <Icon component={IconDocument} className={styles.icon} />
        <span className={styles.title}>
          {formatMessageApi({ Label_COM_Opus: 'SearchResults' })}
        </span>
      </div>

      <div className={styles.buttonWrap}>
        <Buttons.Filter
          handleClick={() => {
            dispatch({
              type: 'opusAdvancedSearch/saveShowFilter',
              payload: {
                showFilter: true,
              },
            });
          }}
        />
        {!!showExport && (
          <Buttons.Export
            defaultStyle
            loading={loading}
            handleClick={() => {
              dispatch({
                type: 'opusAdvancedSearch/getExport',
              });
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Main;
