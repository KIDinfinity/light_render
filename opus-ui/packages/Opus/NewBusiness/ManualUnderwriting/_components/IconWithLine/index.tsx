import React from 'react';
import lodash from 'lodash';
import { Icon } from 'antd';
import styles from './index.less';

export default ({ icon }: any) => {
  if (lodash.isEmpty(icon)) {
    return null;
  }

  let Content: any = <></>;
  if (lodash.isString(icon)) {
    Content = () => <Icon type={icon} />;
  }
  if (React.isValidElement(icon)) {
    Content = () => icon;
  }
  return (
    <div className={styles.icon}>
      <Content />
    </div>
  );
};
