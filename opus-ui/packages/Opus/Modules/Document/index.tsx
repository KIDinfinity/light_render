import React from 'react';
import CaseTaskDetail from 'navigator/components/CaseTaskDetail';
import Content from './Content';
import styles from './index.less';
import AuthPremission from '@/auth/Authorized/AuthPremission';

export default ({ props, caseDetail }: any) => (
  <CaseTaskDetail.Document.Provider {...props}>
    <div className={styles.drawer}>
      <AuthPremission type="Document">
        <Content caseDetail={caseDetail} />
      </AuthPremission>
    </div>
  </CaseTaskDetail.Document.Provider>
);
