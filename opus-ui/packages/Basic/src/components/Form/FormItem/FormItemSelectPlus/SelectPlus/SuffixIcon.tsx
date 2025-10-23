import React from 'react';
import { Icon } from 'antd';
import { ReactComponent as IconDropdown } from 'opus/Assets/icon-select-dropdown.svg';
import styles from './suffixIcon.less';

export default ({ formName, recoverValue, OnRecover, disabled, hightLight }: any) => {
  if (hightLight && !disabled) {
    return (
      <div
        className={styles.reload}
        onClick={() => {
          return OnRecover && OnRecover({ [formName]: recoverValue });
        }}
      >
        <Icon type="reload" />
      </div>
    );
  }
  return <Icon component={IconDropdown} />;
};
