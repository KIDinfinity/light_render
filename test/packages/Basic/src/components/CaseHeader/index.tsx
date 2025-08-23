import React from 'react';
import lodash from 'lodash';
import Title from './Title';
import Info from './Info';
import styles from './Header.less';

interface IProps {
  title: string;
  status?: string;
  urgent?: boolean;
  slaTime?: number | boolean;
  headerInfoConfig?: any[];
  headerInfoRender?: any;
  defaultHeader?: any;
}

export default React.memo(
  ({
    title = '',
    status = '',
    urgent = false,
    slaTime = 0,
    headerInfoConfig,
    headerInfoRender,
    defaultHeader,
  }: IProps) => {
    let info;
    if (React.isValidElement(headerInfoRender)) {
      info = headerInfoRender;
    } else if (lodash.isArray(headerInfoConfig)) {
      info = <Info headerInfoConfig={headerInfoConfig} />;
    } else {
      info = defaultHeader;
    }

    return (
      <div className={styles.header} data-role="bpmHeader">
        <div className={styles.content}>
          <Title title={title} status={status} urgent={urgent} slaTime={slaTime} />
          {info}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => lodash.isEqual(prevProps, nextProps)
);
