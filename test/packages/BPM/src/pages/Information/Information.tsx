import React from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import DrawHeadTitle from '@/components/DrawHeadTitle';
import ManagementLabel from './complex/ManagementLabel';
import InformationContent from './InformationContent';
import styles from './index.less';
import AuthPremission from '@/auth/Authorized/AuthPremission';

// hnw入口
export default ({ authInfoVisible, authInfoEditable, taskDetail }: any) => {
  return (
    <div className={styles.wrap}>
      <DrawHeadTitle>
        {formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.drawer.remark.title',
        })}
      </DrawHeadTitle>
      <ManagementLabel />
      <AuthPremission type="information">
        <InformationContent
          authInfoVisible={authInfoVisible}
          authInfoEditable={authInfoEditable}
          taskDetail={taskDetail}
        />
      </AuthPremission>
    </div>
  );
};
