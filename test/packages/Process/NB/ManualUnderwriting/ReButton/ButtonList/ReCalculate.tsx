import React, { useState } from 'react';
import { Button, Tooltip, Icon } from 'antd';
import useHandleReCalculateCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleReCalculateCallback';
import useGetNeedPremRecalFlag from 'process/NB/ManualUnderwriting/_hooks/useGetNeedPremRecalFlag';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';

const Recalculate = () => {
  const [recalculateLoading, setReCalculateLoading] = useState(false);
  const handleRecalculate = useHandleReCalculateCallback({
    mode: 'show',
    setLoading: setReCalculateLoading,
  });
  const needPremRecal = useGetNeedPremRecalFlag();
  return (
    <Button
      className={styles.element}
      disabled={recalculateLoading}
      onClick={handleRecalculate}
      loading={recalculateLoading}
    >
      {needPremRecal === 'Y' && (
        <div className={styles.reBtnFlag}>
          <Tooltip
            overlayClassName={styles.reBtnFlagTooltip}
            title="Plan has changed, please re-calculate to refresh premium!"
          >
            <Icon type="exclamation-circle" className={styles.icon} theme="filled" />
          </Tooltip>
        </div>
      )}
      <span>
        {formatMessageApi({
          Label_BIZ_Policy: 'Recalculate',
        })}
      </span>
    </Button>
  );
};

Recalculate.displayName = 'reCalculate';

export default Recalculate;
