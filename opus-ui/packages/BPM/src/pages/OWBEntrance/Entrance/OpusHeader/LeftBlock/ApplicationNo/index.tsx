import React from 'react';
import styles from './index.less';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import useGetProcessApplicationNo from 'bpm/pages/OWBEntrance/Entrance/_hooks/useGetProcessApplicationNo';
import { LS, LSKey } from '@/utils/cache';
import ButtonGroup from './ButtonGroup';

const ApplicationNo = () => {
  const applicationNo = useGetProcessApplicationNo();

  const { businessCode } = LS.getItem(LSKey.CURRENTUSER) || {};

  return (
    <span className={styles.applicationNo}>
      <span>
        {formatMessageApi({
          Label_COM_General: businessCode === 'BIZ001' ? 'BusinessNo' : 'ApplicationNo',
        })}
        &ensp;
        {applicationNo}
      </span>
      <ButtonGroup />
    </span>
  );
};

ApplicationNo.displayName = 'applicationNo';

export default ApplicationNo;
