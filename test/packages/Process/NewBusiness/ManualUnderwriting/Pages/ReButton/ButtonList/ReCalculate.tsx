import React, { useState } from 'react';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { Button, Tooltip, Icon } from 'antd';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import { formatMessageApi } from '@/utils/dictFormatMessage';

import { Action } from '@/components/AuditLog/Enum';
import { OptionType } from 'process/NewBusiness/ManualUnderwriting/_enum';

import styles from './index.less';

const Recalculate = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const needPremRecal = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.needPremRecal,
    shallowEqual
  );
  const syncSuccessfully = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.processData?.planInfoData?.syncSuccessfully,
    shallowEqual
  );

  const handleRecalculate = async () => {
    setLoading(true);
    await dispatch({
      type: `${NAMESPACE}/getCalculate`,
      payload: {
        action: Action.Recalculate,
        // TODO:这里应该区分两者
        type: OptionType.recalculateUw,
      },
    });
    setLoading(false);
  };
  return (
    <Button
      className={styles.element}
      disabled={loading}
      onClick={handleRecalculate}
      loading={loading}
    >
      {needPremRecal === 'Y' && !!syncSuccessfully && (
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
          Label_BPM_Button: 'ReCalculate',
        })}
      </span>
    </Button>
  );
};

Recalculate.displayName = 'reCalculate';

export default Recalculate;
