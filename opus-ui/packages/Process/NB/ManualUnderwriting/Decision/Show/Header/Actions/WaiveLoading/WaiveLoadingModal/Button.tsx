import { Button } from 'antd';
import React, { useCallback, useState } from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useHaveError from 'process/NB/ManualUnderwriting/_hooks/useHaveError';
import styles from './index.less';
import { useDispatch } from 'dva';

const ButtonWarp = () => {
  const dispatch = useDispatch();
  const [waiveRecal, setWaiveRecal] = useState(false);
  const haveError = useHaveError();
  const premiumCalculation = useCallback(async () => {
    if (!haveError) {
      setWaiveRecal(true);
      await dispatch({
        type: `${NAMESPACE}/premiumCalculation`,
        payload: {
          operationType: 'manual.uw.waive.recal',
          isWaive: true,
        },
      });
      setWaiveRecal(false);
    }
  }, []);

  return (
    <div className={styles.buttonWarp}>
      <Button
        className={styles.Recalculate}
        onClick={premiumCalculation}
        loading={waiveRecal}
        disabled={haveError}
      >
        {formatMessageApi({
          Label_BIZ_Policy: 'Recalculate',
        })}
      </Button>
    </div>
  );
};

ButtonWarp.displayName = 'button';

export default ButtonWarp;
