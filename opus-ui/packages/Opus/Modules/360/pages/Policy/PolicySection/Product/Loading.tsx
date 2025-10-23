import React from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import DataLayout from '@/components/DataLayout';
import styles from './SubList.less';
import lodash from 'lodash';

const { DataItem } = DataLayout;

export default ({ item }: any) => {
  return (
    <div className={styles.itemContainer}>
      <div className={styles.title}>{formatMessageApi({ Label_BIZ_Policy: 'Loading' })}</div>
      <DataLayout span={4} justify="flex-start">
        <DataItem title={'Reason for Add Loading'} span={8}>
          {!lodash.isNil(item.reason) &&
            `${item.reason} ${formatMessageApi({ Dropdown_POL_ReasonforLoading: item.reason })}`}
        </DataItem>
        <DataItem title={'Multiplier'}>{item.extraMortality}</DataItem>
        <DataItem title={formatMessageApi({ Label_BIZ_Policy: 'EMPeriod' })}>
          {item.emPeriod}
        </DataItem>
        <DataItem title={'PM loading'}>{item.pmLoading}</DataItem>
        <DataItem title={'PM Period'}>{item.pmPeriod}</DataItem>
        <DataItem
          title={formatMessageApi({
            Label_BIZ_Policy: 'FlatMortality',
          })}
        >
          {item.flatMortality}
        </DataItem>
        <DataItem
          title={formatMessageApi({
            Label_BIZ_Policy: 'FMPeriod',
          })}
        >
          {item.fmPeriod}
        </DataItem>
      </DataLayout>
    </div>
  );
};
