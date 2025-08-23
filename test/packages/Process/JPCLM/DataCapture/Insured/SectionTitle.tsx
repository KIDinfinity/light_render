import React from 'react';
import { Icon } from 'antd';
import { useDispatch } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import SearchInsuredModal from './Search/SearchInsuredModal';
import styles from './SectionTitle.less';

export default () => {
  const dispatch = useDispatch();

  const showModel = () => {
    dispatch({
      type: `JPCLMOfDataCapture/updateShowSearchModal`,
      payload: {
        showSearchModel: true,
      },
    });
  };

  return (
    <>
      {formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.insured-information',
      })}
      <div className={styles.search} onClick={showModel}>
        <Icon type="search" />
      </div>
      <SearchInsuredModal />
    </>
  );
};
