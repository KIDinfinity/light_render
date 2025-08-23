import React, { useState } from 'react';
import { Button, Icon, Tooltip } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import useHandleGenerateSICallback from 'process/NB/ManualUnderwriting/_hooks/useHandleGenerateSICallback';
import useGetGenerateSITooltip from 'process/NB/ManualUnderwriting/_hooks/useGetGenerateSITooltip';
import useGetNewSiRequired from 'process/NB/ManualUnderwriting/_hooks/useGetNewSiRequired';
import styles from './index.less';

const GenerateSI = () => {
  const [generateSILoading, setGenerateSILoading] = useState(false);

  const newSiRequired = useGetNewSiRequired();
  const handleGenerateSI = useHandleGenerateSICallback({ setLoading: setGenerateSILoading });
  const message = useGetGenerateSITooltip();
  return (
    <Button onClick={handleGenerateSI} disabled={generateSILoading} loading={generateSILoading}>
      {newSiRequired === 'Y' && (
        <div className={styles.reBtnFlag}>
          <Tooltip overlayClassName={styles.reBtnFlagTooltip} title={message}>
            <Icon type="exclamation-circle" className={styles.icon} theme="filled" />
          </Tooltip>
        </div>
      )}
      {formatMessageApi({
        Label_BIZ_Policy: 'GenerateSI',
      })}
    </Button>
  );
};

GenerateSI.displayName = 'genderateSI';

export default GenerateSI;
