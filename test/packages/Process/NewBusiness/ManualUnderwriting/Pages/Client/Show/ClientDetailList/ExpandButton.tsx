import React from 'react';
import { Icon } from 'antd';
import { useSelector, useDispatch } from 'dva';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import styles from './expandButton.less';
import useJudgeEvevryFieldsDisplay from 'process/NewBusiness/ManualUnderwriting/_hooks/useJudgeEvevryFieldsDisplay';
import classnames from 'classnames';

export default ({ clientId }: any) => {
  const dispatch = useDispatch();
  const expandedClientId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.expandedClientId
  );
  const isAllFieldDisplay = useJudgeEvevryFieldsDisplay({ id: clientId });
  const toggle = () => {
    dispatch({
      type: `${NAMESPACE}/toggleClient`,
      payload: {
        clientId,
      },
    });
  };

  return (
    <div
      className={classnames(styles.expand, {
        [styles.hidden]: isAllFieldDisplay,
      })}
    >
      <Icon type={!expandedClientId ? 'right' : 'down'} onClick={toggle} />
    </div>
  );
};
