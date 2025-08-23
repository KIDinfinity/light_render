import React from 'react';
import { Table } from 'antd';
import { fnPrecisionFormat, fnPrecisionParser } from '@/utils/precisionUtils';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';
interface IProps {
  tsarCategoryData: any;
}

const TSAR = ({ tsarCategoryData }: IProps) => {
  const getColumns = () => {
    return [
      {
        title: 'Tsar Category',
        dataIndex: 'tsarCalculationCategory',
        render: (text: string) =>
          formatMessageApi({
            Label_Slider_360: text,
          }),
      },
      {
        title: 'Month Period',
        dataIndex: 'monthPeriod',
      },
      {
        title: 'Policy Status',
        dataIndex: 'policyStatus',
      },
      {
        title: 'Risk Type',
        dataIndex: 'riskType',
        render: (text: string) =>
          formatMessageApi({
            Dropdown_IND_Risktype: text,
          }),
      },
      {
        title: 'Tsar Amount',
        dataIndex: 'tsar',
        render: (text: string) => fnPrecisionFormat(fnPrecisionParser(parseFloat(text))),
      },
    ];
  };
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        {formatMessageApi({
          Label_BIZ_Policy: 'TSARByCategory',
        })}
      </h3>
      <div className={styles.dataContainer}>
        <Table
          rowKey="key"
          dataSource={tsarCategoryData}
          columns={getColumns()}
          pagination={false}
        />
      </div>
    </div>
  );
};

TSAR.displayName = 'TSAR';

export default TSAR;
