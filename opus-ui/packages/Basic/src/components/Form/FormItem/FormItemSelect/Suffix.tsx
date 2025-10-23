import React, { useMemo } from 'react';
import { Icon } from 'antd';
import { isUndefined, isEqual } from 'lodash';
import { ReactComponent as IconDropdown } from 'opus/Assets/icon-select-dropdown.svg';
import styles from '../index.less';

interface SuffixProps {
  form: any;
  onChangeFn: Function;
  suffix: any;
  formName?: string;
  recoverValue: any;
  OnRecover: any;
  disabled?: boolean;
  value?: string[] | string;
}

export default ({
  form,
  onChangeFn,
  suffix,
  formName = '',
  recoverValue,
  OnRecover,
  disabled,
  value,
}: SuffixProps) => {
  return useMemo(() => {
    const finalValue = form?.getFieldValue(formName) || value;
    if (suffix) {
      return suffix;
    }
    if (!isUndefined(recoverValue)) {
      if (!isEqual(recoverValue, finalValue) && !disabled) {
        return (
          <div className={styles.reloadBox}>
            <div
              className={styles.reload}
              onClick={() => {
                OnRecover({ [formName]: recoverValue });
                onChangeFn();
              }}
            >
              <Icon type="reload" />
            </div>
            <Icon type="down" />
          </div>
        );
      }
      return <Icon type="down" />;
    }

    return <Icon component={IconDropdown} />;
  }, [form, suffix, formName, recoverValue, OnRecover, disabled]);
};
