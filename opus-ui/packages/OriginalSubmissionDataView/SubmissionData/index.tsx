import React from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import ReactJson from 'react-json-view';
import moment from 'moment';
import DataLayout from '@/components/DataLayout';
import { NAMESPACE } from '../activity.config';
import styles from './index.less';

const SubmissionData = () => {
  const submissionData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.submissionData
  );
  const submissionChannel = lodash.get(submissionData, 'businessData.submissionChannel');
  const submissionDate = lodash.get(submissionData, 'submitDate');
  const { DataItem } = DataLayout;

  return (
    <div className={styles.wrap}>
      <div className={styles.title}>
        <span>Submission Data</span>
      </div>
      <div className={styles.caseInfo}>
        <DataLayout className={styles.caseInfo} rowProps={{ align: 'middle' }}>
          <DataItem title="Submission Channel">{submissionChannel}</DataItem>
          <DataItem title="Submission Date">
            {submissionDate ? moment(submissionDate)?.format?.('L') : null}
          </DataItem>
          <DataItem title="Submission Time">
            {submissionDate ? moment(submissionDate)?.format?.('LTS') : null}
          </DataItem>
        </DataLayout>
      </div>
      <div className={styles.submissionData}>
        {!lodash.isEmpty(submissionData) ? (
          <ReactJson
            src={submissionData}
            theme="google"
            style={{ backgroundColor: 'transparent' }}
            displayDataTypes={false}
            displayObjectSize={false}
            collapsed={false}
            enableClipboard={false}
            onEdit={false}
            onDelete={false}
            onAdd={false}
            onSelect={false}
          />
        ) : null}
      </div>
    </div>
  );
};

export default SubmissionData;
