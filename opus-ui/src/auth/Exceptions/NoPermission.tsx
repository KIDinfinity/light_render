import { formatMessageApi } from '@/utils/dictFormatMessage';
import React from 'react';
import { Link } from 'umi';
import Exception from '@/components/Exception';
import styles from './index.less';

const NoPermissionException = () => (
  <Exception
    desc=" "
    className={styles.noPermission}
    title={formatMessageApi({ Label_BIZ_Claim: 'claim.exception.noPermission' })}
    linkElement={Link}
    backText={formatMessageApi({ Label_BIZ_Claim: 'app.exception.back' })}
  />
);

export default NoPermissionException;
