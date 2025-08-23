import React from 'react';
import lodash from 'lodash';
import InfoLabel from './InfoLabel';
import styles from './InfoHead.less';

export default React.memo(({ children, indicator }: any) => {
  const topMap = ['processInstanceId'];

  const infoTop = {
    ...children,
    props: {
      children: lodash.reduce(
        children.props.children,
        (newchildren: any, item: any) => {
          return lodash.includes(topMap, item?.key) ? [...newchildren, item] : newchildren;
        },
        []
      ),
    },
  };

  const infoBottom = {
    ...children,
    props: {
      children: lodash.reduce(
        children.props.children,
        (newchildren: any, item: any) => {
          return lodash.includes(topMap, item?.key) ? newchildren : [...newchildren, item];
        },
        []
      ),
    },
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.infoTop}>
        <div>{infoTop}</div>
        <div className={styles.infoLabel}>
          <InfoLabel indicator={indicator} />
        </div>
      </div>
      <div>{infoBottom}</div>
    </div>
  );
});
