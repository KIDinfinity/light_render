import React from 'react';
import moment from 'moment';
import styles from './index.less';
import { FormatMessageHTML } from '@/utils/dictFormatMessage';
const Header = ({ data }: any) => {
  return (
    <div className={styles.container}>
      <span className={styles.middle}>
        <FormatMessageHTML templateId={{ Label_BPM_CaseCategory: data?.caseCategory }} />
        /
        <FormatMessageHTML templateId={{ activity: data?.activityKey }} />
      </span>
      <span className={styles.name}>{data?.creator}</span>
      <span className={styles.date}>{moment(data?.requestTime).format('DD/MM/YYYY HH:mm')}</span>
    </div>
  );
};

Header.displayName = 'Header';

export default Header;
