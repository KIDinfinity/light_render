import React from 'react';
import C360Content from './C360Content';
import styles from './index.less';
import AuthPremission from '@/auth/Authorized/AuthPremission';

export default ({ caseDetail }: any) => (
  <div className={styles.drawerTab360}>
    <AuthPremission type="360">
      <C360Content caseDetail={caseDetail} />
    </AuthPremission>
  </div>
);
