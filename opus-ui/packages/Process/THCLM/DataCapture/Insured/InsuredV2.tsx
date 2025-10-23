import React from 'react';
import { NAMESPACE } from '../activity.config';
import { Icon } from 'antd';
import { useDispatch } from 'dva';
import InsuredSection, { SectionTitle } from 'process/Components/BussinessControls/Insured';
import { FormAntCard } from 'basic/components/Form';
import styles from './Insured.less';

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
        <InsuredSection.SectionBasic NAMESPACE={NAMESPACE} />
      </FormAntCard>
    </div>
  );
};

export default InsuredInfo;
