import { useSelector } from 'dva';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import React from 'react';
import SurrenderTableLayout from './SurrenderTableLayout';

const columns = [
  {
    title: 'Cover',
    span: 3,
    key: 'coverageSeq',
  },
  {
    title: 'Rider',
    span: 3,
    key: 'riderSeq',
  },
  {
    title: 'Fund',
    span: 2,
    key: 'fundCode',
  },
  {
    title: 'Type',
    span: 2,
    key: 'fundType',
  },
  {
    title: 'Descrition',
    span: 4,
    key: 'surrenderType',
  },
  {
    title: 'Ccy',
    span: 2,
    key: 'currency',
  },
  {
    title: 'Estimated Value',
    span: 4,
    key: 'estimatedValue',
  },
  {
    title: 'Actual Value',
    span: 4,
    key: 'actualValue',
  },
];

const CoverageRiderDetails = ({ transactionId }: any) => {
  const policySurrenderCoverageList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.entities?.transactionTypesMap?.[transactionId]?.policySurrender
        ?.policySurrenderCoverageList
  );
  return (
    <SurrenderTableLayout
      columns={columns}
      dataSource={policySurrenderCoverageList}
      TableLabel="Coverage/Rider Details"
    />
  );
};

export default CoverageRiderDetails;
