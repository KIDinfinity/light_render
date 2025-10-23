import React from 'react';
import lodash from 'lodash';
import { Icon } from 'antd';
import applicationChenkedIcon from '@/assets/unknowDoc-application-checked-icon.svg';
import unpictureIcon from '@/assets/common-unpicture-icon.svg';

import styles from './application.less';

const Application = ({ list }) => {
  return (
    <div className={styles.wrap}>
      {lodash.map(list, (childItem: any) => (
        <div className={styles.baseWrap} key={childItem?.docId}>
          <span className={styles.leftItem}>
            <span className={styles.imageIcon}>
              <img src={applicationChenkedIcon} alt="urgent" />
            </span>
            <span>
              <Icon className={styles.icon} type="check-circle" style={{ color: '#4AC997' }} />
            </span>
          </span>
          <span className={styles.middleItem}>{childItem?.name}</span>
          <span className={styles.rightItem}>
            {childItem?.imageUrl! === '' && (
              <span className={styles.imageIcon}>
                <img src={unpictureIcon} alt="urgent" />
              </span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Application;
