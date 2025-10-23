import { useSelector } from 'dva';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import React from 'react';
import SurrenderTableLayout from './SurrenderTableLayout';

const columns = [
  {
    title: 'Sub A/C code',
    key: 'subAcCode',
    span: 8,
    render: (item: any) => {
      return `${item.subAcCode}/${item.subAcType}`;
    },
  },
  {
    title: 'Current Balance',
    key: 'subAcBalance',
    span: 8,
  },
  {
    title: 'Currency',
    key: 'subAcCurrency',
    span: 8,
  },
];

const SuspenseBalanceDetails = () => {
  const policySubAccountList =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace?.processData?.policyInfo?.policySubAccountList
    ) || [];

  return (
    <SurrenderTableLayout
      columns={columns}
      dataSource={policySubAccountList}
      TableLabel="Suspense balance detail"
      suspenseBalanceDetails
    />
  );
};

export default SuspenseBalanceDetails;
