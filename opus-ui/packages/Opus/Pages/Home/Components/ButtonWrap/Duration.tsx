import React from 'react';
import lodash from 'lodash';

import { getDrowDownList } from '@/utils/dictFormatMessage';

import { Select } from 'opus/Components/Antd';

import styles from './index.less';

const { Option } = Select;

const orderArr = ['D', 'W', 'M'];

export default ({ code, callback }: any) => {
  const unSortData = getDrowDownList('Dropdown_Opus_Duration') || [];
  const durationList = lodash.orderBy(unSortData, (item) => orderArr.indexOf(item.dictCode), 'asc');
  return (
    <Select
      value={code}
      className={styles.item}
      onChange={(value: string) => {
        callback(value);
      }}
    >
      {lodash.map(durationList, ({ dictCode, dictName }: any) => (
        <Option value={dictCode} key={dictCode}>
          {dictName}
        </Option>
      ))}
    </Select>
  );
};
