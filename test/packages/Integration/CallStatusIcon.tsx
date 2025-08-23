import React, { useMemo } from 'react';
import { Icon } from 'antd';
import { ReactComponent as completedIcon } from 'integration/assets/integrationCompleted.svg';
import { ReactComponent as errorIcon } from 'integration/assets/integrationError.svg';
import { ReactComponent as pendingRetryIcon } from 'integration/assets/integrationPendingRetry.svg';
import { ReactComponent as inProcess } from 'integration/assets/integrationInProgress.svg';
import CallStatus from 'integration/Enum/CallStatus';

interface IProps {
  callStatus: CallStatus;
}
const CallStatusIcon = ({ callStatus }: IProps) => {
  return useMemo(() => {
    return React.createElement(Icon, {
      component: (() => {
        let currentIcon = null;
        switch (callStatus) {
          case CallStatus.success:
            currentIcon = completedIcon;
            break;
          case CallStatus.fail:
            currentIcon = errorIcon;
            break;
          case CallStatus.retry:
            currentIcon = pendingRetryIcon;
            break;
          default:
            currentIcon = inProcess;
        }
        return currentIcon;
      })(),
    });
  }, [callStatus]);
};

export default CallStatusIcon;
