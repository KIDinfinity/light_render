import React from 'react';
import { NAMESPACE } from '../activity.config';
import { Icon } from 'antd';
import { useDispatch } from 'dva';
import Insured, { SectionTitle } from 'process/Components/BussinessControls/Insured';
import { FormAntCard } from 'basic/components/Form';
import styles from './index.less';

const InsuredInfo = () => {
  const dispatch = useDispatch();

  const showSearchModel = () => {
    dispatch({
      type: `${NAMESPACE}/updateShowSearchModal`,
      payload: {
        showSearchModel: true,
      },
    });
  };

  return (
    <div className={styles.insured}>
      <FormAntCard
        title={
          <>
            <SectionTitle />
            <div className={styles.search} onClick={showSearchModel}>
              <Icon type="search" />
            </div>
          </>
        }
      >
        <Insured.SectionBasic NAMESPACE={NAMESPACE} />
      </FormAntCard>
    </div>
  );
};

export default InsuredInfo;
