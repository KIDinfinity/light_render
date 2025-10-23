import React from 'react';
import { Table } from 'antd';
import { useSelector } from 'dva';
import columns from './columns';
import styles from './index.less';
import { summaryColumns } from './summaryColumns';
import { dataPreProcess, ASLSortArr, nonASLSortArr } from './utils';

const Coverage = () => {
  const opusSummary = useSelector(
    ({ insured360 }: any) => insured360?.summaryCoverage?.opusSummary
  );

  const totalSummary = useSelector(({ insured360 }: any) => insured360?.coverageTable || []);
  const totalSummaryDataSource = dataPreProcess(totalSummary, ASLSortArr, 'benefitType', true);

  return (
    <div className={styles.container}>
      <Table
        columns={columns()}
        dataSource={dataPreProcess(opusSummary, nonASLSortArr, 'benefitType')}
        pagination={false}
      />
      <div className={styles.divider} />
      <Table
        className={styles.summaryTable}
        columns={summaryColumns()}
        dataSource={totalSummaryDataSource}
        pagination={false}
      />
    </div>
  );
};

export default Coverage;
