import React from 'react';
import classnames from 'classnames';
import styles from './expandButton.less';
import { Icon } from 'antd';
import useToggleClientDetail from 'process/NB/ManualUnderwriting/_hooks/useToggleClientDetail';
import useJudgeEvevryFieldsDisplay from 'process/NB/ManualUnderwriting/_hooks/useJudgeEvevryFieldsDisplay';

export default ({ id, expand }: any) => {
  const isAllFieldDisplay = useJudgeEvevryFieldsDisplay({ id });
  const toggle = useToggleClientDetail({ expand });
  return (
    <div
      className={classnames(styles.actions, {
        [styles.hidden]: isAllFieldDisplay,
      })}
    >
      <Icon
        type={!expand ? 'down' : 'up'}
        onClick={() => {
          toggle(id);
        }}
      />
    </div>
  );
};
