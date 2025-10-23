import React from 'react';
import { history } from 'umi';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import { LS, LSKey } from '@/utils/cache';
import { ReactComponent as BackIcon } from 'opus/Assets/back.svg';
import styles from './index.less';

const BackButton = () => {
  const back = () => {
    history.back();
  };
  return (
    <div className={styles.back} onClick={back}>
      <BackIcon />
    </div>
  );
};

const ApplicationNo = ({ inquiryApplicationNo }: any) => {
  const { businessCode } = LS.getItem(LSKey.CURRENTUSER) || {};
  return (
    <span className={styles.applicationNo}>
      {formatMessageApi({
        Label_COM_General: businessCode === 'BIZ001' ? 'BusinessNo' : 'ApplicationNo',
      }) + ': '}
      {inquiryApplicationNo}
    </span>
  );
};

export default ({ children, inquiryApplicationNo, activityKey }: any) => {
  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <BackButton />
        <ApplicationNo inquiryApplicationNo={inquiryApplicationNo} />
        <div className={styles.activity}>
          {activityKey
            ? formatMessageApi({ activity: activityKey })
            : formatMessageApi({
                Label_BIZ_Claim: 'app.navigator.task-detail.title.claim-inquiry',
              })}
        </div>
      </div>
      <div className={styles.right}>{children}</div>
    </div>
  );
};
