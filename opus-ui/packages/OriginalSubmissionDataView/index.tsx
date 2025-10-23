import React, { useEffect } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from './activity.config';
import CaseInfo from './CaseInfo';
import SubmissionData from './SubmissionData';
import styles from './index.less';

const OriginalSubmissionDataView = ({ match }: any) => {
  const dispatch = useDispatch();
  const {
    params: { processInstanceId },
  } = match;

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/getCaseDetails`,
      payload: {
        processInstanceId,
      },
    });
    dispatch({
      type: 'global/changeLayoutHeader',
      payload: {
        isShowHeader: false,
      },
    });
    dispatch({
      type: `${NAMESPACE}/getSubmissionData`,
      payload: {
        caseNo: processInstanceId,
      },
    });
    return () => {
      dispatch({
        type: 'global/changeLayoutHeader',
        payload: {
          isShowHeader: true,
        },
      });
    };
  }, []);

  return (
    <div className={styles.wrap}>
      <div className={styles.submissionDataViewCon}>
        <div className={styles.submissionDataViewHeader}>
          <CaseInfo />
        </div>
        <div className={styles.submissionDataViewData}>
          <SubmissionData />
        </div>
      </div>
    </div>
  );
};

export default OriginalSubmissionDataView;
