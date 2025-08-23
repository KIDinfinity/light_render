import React from 'react';
import { useSelector } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import DrawHeadTitle from '@/components/DrawHeadTitle';
import C360Content from './C360Content';
import styles from './index.less';
import AuthPremission from '@/auth/Authorized/AuthPremission';

// hnw入口
const Custom = () => {
  const changeId = useSelector(({ insured360 }: any) => insured360?.taskInfo?.changeId) || '';
  const noPermissionCases = useSelector(
    ({ authController }: any) => authController.noPermissionCases
  );
  const noPermissionClaimNos = useSelector(
    ({ authController }: any) => authController.noPermissionClaimNos
  );

  return (
    <div className={styles.drawerTab360}>
      <DrawHeadTitle>{formatMessageApi({ Label_BIZ_Claim: '360CustomerView' })}</DrawHeadTitle>
      <AuthPremission type="360">
        <C360Content />
      </AuthPremission>
    </div>
  );
};

export default Custom;
