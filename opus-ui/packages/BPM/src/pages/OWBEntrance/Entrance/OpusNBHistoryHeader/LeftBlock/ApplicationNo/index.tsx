import React from 'react';
import styles from './index.less';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { LS, LSKey } from '@/utils/cache';
import { useSelector } from 'dva';

const ApplicationNo = () => {
  const { businessData = {} } = useSelector((state: any) => state.newBusinessManualUnderwriting);

  const { businessCode } = LS.getItem(LSKey.CURRENTUSER) || {};
  const { applicationNo, inquiryApplicationNo } = businessData;

  return (
    <span className={styles.applicationNo}>
      {formatMessageApi({
        Label_COM_General: businessCode === 'BIZ001' ? 'BusinessNo' : 'ApplicationNo',
      })}
      {inquiryApplicationNo}
    </span>
  );
};

ApplicationNo.displayName = 'applicationNo';

export default ApplicationNo;
