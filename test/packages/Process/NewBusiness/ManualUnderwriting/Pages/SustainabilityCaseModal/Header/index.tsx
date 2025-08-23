import React from 'react';
import { useSelector } from 'dva';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Capitalize from 'basic/components/CaseHeader/Capitalize';
import styles from './index.less';

const Header = () => {
  const sustainabilityValidate = useSelector(
    ({ [NAMESPACE]: modelNamespace }: any) => modelNamespace.sustainabilityValidate
  );

  return (
    <div className={styles.container}>
      {sustainabilityValidate && (
        <ErrorTooltipManual
          manualErrorMessage={formatMessageApi({ Label_COM_ErrorMessage: 'MSG_000794' })}
        />
      )}
      <Capitalize title={formatMessageApi({ Label_BIZ_Policy: 'Sustainability' })} />
    </div>
  );
};

Header.displayName = 'header';

export default Header;
