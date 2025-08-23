import React from 'react';
import { Input, Icon } from 'antd';
import { map, compact } from 'lodash';
import styles from './index.less';

function Search({ datas, setDatas }: any) {
  const onChange = (event: any) => {
    const { value } = event.currentTarget;
    const valueReg = new RegExp(['', ...String(value).toLowerCase(), ''].join('.*'));
    setDatas(
      map(compact(datas), (item: any) => ({
        ...item,
        filter: !valueReg.test(String(item.formatName).toLowerCase()),
      }))
    );
  };

  return (
    <div className={styles.searchBox}>
      <Input className={styles.search} onChange={onChange} prefix={<Icon type="search" />} />
    </div>
  );
}

export default Search;
