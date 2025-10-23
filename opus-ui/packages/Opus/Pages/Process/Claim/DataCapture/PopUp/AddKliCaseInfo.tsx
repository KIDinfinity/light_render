import React from 'react';
import { useSelector, useDispatch } from 'dva';
import { Icon } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { NAMESPACE } from 'opus/Pages/Process/Claim/DataCapture/activity.config';
import { ReactComponent as IconPlus } from 'opus/Assets/icon-plus.svg';
import styles from './index.less';

export default ({ form, item, existPolicy, incidentId }: any) => {
  const dispatch = useDispatch();

  const claimNo = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData?.claimNo
  );

  const handleAdd = () => {
    dispatch({
      type: `${NAMESPACE}/klipCaseInfoAdd`,
      payload: {
        incidentId,
        claimNo,
      },
    });
  };


  return (
    <div className={styles.caseInfo}>
      <div className={styles.tips}>
      <div className={styles.tipsTitle}>{formatMessageApi({ Label_BIZ_Policy: 'PolicySource' })}</div>
      <div className={styles.tipsActions}>
          <Icon component={IconPlus} onClick={handleAdd} />
        </div>
      </div>
    </div>
  );
};
