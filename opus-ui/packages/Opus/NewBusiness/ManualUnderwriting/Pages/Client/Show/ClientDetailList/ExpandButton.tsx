import React from 'react';
import { Icon } from 'antd';
import { useSelector, useDispatch } from 'dva';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import styles from './expandButton.less';
import useJudgeEvevryFieldsDisplay from 'opus/NewBusiness/ManualUnderwriting/_hooks/useJudgeEvevryFieldsDisplay';
import classnames from 'classnames';

const ExpandButton = ({ clientId }: any) => {
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
      {!expandedClientId ? (
        <span className={styles.expandButton} onClick={toggle}>
          <Icon type={'down'} />
          <span className={styles.title}>View More</span>
        </span>
      ) : (
        <span className={styles.expandButton} onClick={toggle}>
          <Icon type={'up'} />
          <span className={styles.title}>View Less</span>
        </span>
      )}
    </div>
  );
};

ExpandButton.displayName = 'expandButton';

export default ExpandButton;
