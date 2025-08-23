import React from 'react';
import { Tooltip, Icon } from 'antd';
import classnames from 'classnames';
import styles from './ShowHideButton.less';

export default ({ show = false, onChange, newButtonStyle = false }: any) => {
  const onClick = () => {
    onChange(!show);
  };

  return (
    <Tooltip>
      <div
        className={
          newButtonStyle
            ? classnames(styles.invoiceShowHideButton, 'venus-ui-expand-button')
            : classnames(styles.showHideButton, 'venus-ui-expand-button')
        }
      >
        <Icon type={show ? 'up' : 'down'} onClick={onClick} />
      </div>
    </Tooltip>
  );
};
