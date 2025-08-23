import React, { useMemo } from 'react';
import lodash from 'lodash';
import { Icon } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import useGetButtonActionFunc from 'basic/components/Questionnaire/_hooks/useGetButtonActionFunc';
import styles from './button.less';

const ActionButton = ({ config }: any) => {
  const { icon, buttonCode } = useMemo(() => {
    return lodash.pick(config, ['icon', 'buttonCode']);
  }, [config]);
  const action = useGetButtonActionFunc({ buttonCode: config?.buttonCode });
  return (
    <button className={styles.button} type="button" onClick={action}>
      {lodash.isString(icon) && <Icon type={icon} />}
      {React.isValidElement(icon) && icon}
      <span className={styles.label}>{formatMessageApi({ Label_BPM_Button: buttonCode })}</span>
    </button>
  );
};

export default ActionButton;
