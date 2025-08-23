import React from 'react';

import { formatMessageApi } from '@/utils/dictFormatMessage';

import styles from './index.less';

const GIOStatement = ({ statement }: { statement?: string }) => {
  return (
    <div className={styles.GIOStatement}>
      {formatMessageApi({ Label_BIZ_Policy: 'GIOStatement' })}
      <div className={styles.agree}>
        {statement &&
          formatMessageApi({
            Dropdown_POL_Statement: statement,
          })}
      </div>
    </div>
  );
};
export default GIOStatement;
