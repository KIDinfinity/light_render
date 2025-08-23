import React, { useMemo } from 'react';
import { Icon } from 'antd';
import lodash from 'lodash';
import styles from '../index.less';

export default ({ form, suffix, formName, recoverValue, OnRecover, disabled }: any) => {
  return useMemo(() => {
    const formValue = form.getFieldValue(formName);
    if (suffix) {
      return suffix;
    }
    if (!lodash.isUndefined(recoverValue) && !disabled) {
      if (!lodash.isEqual(recoverValue, formValue)) {
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
      return <span />;
    }
    return null;
  }, [form, suffix, formName, recoverValue, OnRecover, disabled]);
};
