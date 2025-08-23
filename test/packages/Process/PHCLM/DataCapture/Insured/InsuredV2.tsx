import React, { useEffect } from 'react';
import { NAMESPACE } from '../activity.config';
import { Icon } from 'antd';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import InsuredSection, { SectionTitle } from 'process/Components/BussinessControls/Insured';
import { FormAntCard } from 'basic/components/Form';
import styles from './Insured.less';

const UpdateAgesComponent = () => {
  const { policyContractList, insured, submissionDate } = useSelector(
    ({ [NAMESPACE]: modelnamespace, processTask }) => {
      return {
        insured: modelnamespace.claimProcessData?.insured,
        policyContractList: modelnamespace.c360PolicyInfo?.policyContractList,
        submissionDate:
          modelnamespace.claimProcessData?.submissionDate || processTask?.getTask?.submissionDate,
      };
    },
    shallowEqual
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (insured.dateOfBirth || insured.policyId) {
      dispatch({
        type: `${NAMESPACE}/updateAges`,
        payload: {
          submissionDate,
        },
      });
    }
  }, [policyContractList, insured?.policyId, insured?.dateOfBirth, submissionDate]);
  return null;
};

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
      <UpdateAgesComponent />
    </div>
  );
};

export default InsuredInfo;
