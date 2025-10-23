import React from 'react';
import { Radio } from 'antd';
import lodash from 'lodash';
import styles from './index.less';

function RadioGroup({ currentVersion, versions, setCurrentVersion, isEditable = true }: any) {
  const handleChange = (e: any) => {
    isEditable && setCurrentVersion(e?.target?.value);
  };

  return (
    <Radio.Group onChange={handleChange} value={currentVersion} className={styles.radioGroup}>
      {lodash.map(versions, (item: any) => (
        <Radio.Button value={item.date} key={item.date}>
          {item.date}
        </Radio.Button>
      ))}
    </Radio.Group>
  );
}

export default RadioGroup;
