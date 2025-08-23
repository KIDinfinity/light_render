import React, { useMemo } from 'react';
import { Icon } from 'antd';
import styles from '../index.less';

interface SuffixProps {
  suffix: any;
  hightLight: boolean;
  disabled?: boolean;
  OnRecover: any;
  formName?: string;
  recoverValue: any;
}

export default ({
  suffix,
  hightLight,
  disabled,
  OnRecover,
  formName = '',
  recoverValue,
}: SuffixProps) => {
  return useMemo(() => {
    if (suffix) {
      return suffix;
    }
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
    return null;
  }, [suffix, hightLight, disabled, OnRecover, formName, recoverValue]);
};
