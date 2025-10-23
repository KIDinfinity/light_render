import React from 'react';
import styles from './index.less';
import getDropDownFormat from '../../../Utils/getDropDownFormat';

function Title({ labelId, type = 'Label_BIZ_Claim', defaultName }) {
  return (
    <div className={styles.title}>
      {getDropDownFormat({
        labelId,
        type,
        defaultName: defaultName || labelId,
      })}
    </div>
  );
}

export default Title;
