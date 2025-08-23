import React from 'react';
import lodash from 'lodash';
import InfoItem from './InfoItem';
import styles from './Info.less';

interface Info {
  key: string;
  value: string;
  title: string;
  render?: Function;
  renderValue?: Function;
}

export default React.memo(
  ({ children, headerInfoConfig = [] }: any) => {
    if (React.Children.count(children)) {
      return (
        <div className={styles.wrap}>
          <div className={styles.info}>{children}</div>
        </div>
      );
    }
    return (
      <div className={styles.wrap}>
        <div className={styles.info}>
          {lodash
            ?.chain(headerInfoConfig)
            ?.filter((info: Info) => lodash.isPlainObject(info))
            .map((info: Info, index: number) => <InfoItem key={index} {...info} />)
            .value()}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => lodash.isEqual(prevProps, nextProps)
);
