import React, { useMemo } from 'react';
import lodash from 'lodash';
import { Icon } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './button.less';

const ActionButton = ({ config }: any) => {
  const { icon, buttonCode } = useMemo(() => {
    return lodash.pick(config, ['icon', 'buttonCode']);
  }, [config]);

  return (
    <button className={styles.button} type="button" onClick={config.click}>
      {lodash.isString(icon) && <Icon type={icon} />}
      {React.isValidElement(icon) && icon}
      <span className={styles.label}>{formatMessageApi({ Label_BPM_Button: buttonCode })}</span>
    </button>
  );
};

export default ActionButton;
