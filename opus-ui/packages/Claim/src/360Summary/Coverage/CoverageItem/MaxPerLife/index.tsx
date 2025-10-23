import React from 'react';
import { Table } from 'antd';
import { fnPrecisionFormat, fnPrecisionParser } from '@/utils/precisionUtils';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';

const MaxPerLife = ({ maxPerLifeData }: any) => {
  const getColumns = () => {
    return [
      {
        title: 'Product',
        dataIndex: 'componentCode',
        render: (text: string) =>
          formatMessageApi({
            Label_Slider_360: text,
          }),
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
          Label_BIZ_Policy: 'TSARByMaxPerLife',
        })}
      </h3>
      <div className={styles.dataContainer}>
        <Table rowKey="key" dataSource={maxPerLifeData} columns={getColumns()} pagination={false} />
      </div>
    </div>
  );
};

MaxPerLife.displayName = 'MaxPerLife';

export default MaxPerLife;
