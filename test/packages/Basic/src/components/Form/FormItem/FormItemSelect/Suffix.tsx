import React, { useMemo } from 'react';
import { Icon } from 'antd';
import { isUndefined, isEqual } from 'lodash';
import styles from '../index.less';

interface SuffixProps {
  form: any;
  onChangeFn: Function;
  suffix: any;
  formName?: string;
  recoverValue: any;
  OnRecover: any;
  disabled?: boolean;
}

export default ({
  form,
  onChangeFn,
  suffix,
  formName = '',
  recoverValue,
  OnRecover,
  disabled,
}: SuffixProps) => {
  return useMemo(() => {
    const formValue = form.getFieldValue(formName);
    if (suffix) {
      return suffix;
    }
    if (!isUndefined(recoverValue)) {
      if (!isEqual(recoverValue, formValue) && !disabled) {
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
    return null;
  }, [form, suffix, formName, recoverValue, OnRecover, disabled]);
};
