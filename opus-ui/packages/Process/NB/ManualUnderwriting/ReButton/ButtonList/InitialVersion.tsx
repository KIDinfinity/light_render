import React, { useState } from 'react';
import { Button } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import useHandleInitialVersion from 'process/NB/ManualUnderwriting/_hooks/useHandleInitialVersion';
import styles from './index.less';
import AuthorizedAtom from '@/auth/Components/Authorized/AuthorizedAtom';

const InitialVersion = () => {
  const currentAuthority = 'RS_NB_Button_ManualUW_InitialVersion';
  const [isLoading, setLoading] = useState(false);
  const handleInitialVersion = useHandleInitialVersion({
    setLoading,
  });

  return (
    <AuthorizedAtom currentAuthority={currentAuthority} key="RS_NB_Button_ManualUW_InitialVersion">
      <Button
        className={styles.element}
        disabled={isLoading}
        onClick={handleInitialVersion}
        loading={isLoading}
      >
        {formatMessageApi({
          Label_BIZ_policy: 'initialVersion',
        })}
      </Button>
    </AuthorizedAtom>
  );
};

InitialVersion.displayName = 'initialVersion';

export default InitialVersion;
