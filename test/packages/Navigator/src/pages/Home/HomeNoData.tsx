import React from 'react';
import { Icon } from 'antd';
import styles from './Home.less';
import classNames from 'classnames';
import { ReactComponent as NoDataIcon1 } from '../../assets/no-data-icon-1.svg';
import { ReactComponent as NoDataIcon2 } from '../../assets/no-data-icon-2.svg';
import NoDataBgMsg from '../../assets/no-data-bg-msg.png';
import NoDataBgMsgStar from '../../assets/no-data-bg-msg-star.png';

export default ({ dashboardHidden }) => {
  return (
    <div className={styles.noDataWrapper}>
      <div
        className={classNames(styles.noDataBox, {
          [styles.noDataBoxHidden]: dashboardHidden,
        })}
      >
        <div
          className={classNames(styles.noDataMsgWrapper, {
            [styles.noDataMsgWrapperHidden]: dashboardHidden,
          })}
        >
          <div className={styles.noDataMsgBox}>
            <Icon className={styles.noDataIcon1} component={NoDataIcon1} />
            <div className={styles.noDataMsg}>
              <Icon className={styles.noDataIcon2} component={NoDataIcon2} />
              <p>There are Currently No</p>
              <p>Assigned Tasks.</p>
              <p>To make a query, please</p>
              <p>visit the inquiry page.</p>
              <Icon className={styles.noDataIcon3} component={NoDataIcon2} />
            </div>
          </div>
          <div className={styles.noDataImg}>
            <img className={styles.noDataBgMsg} src={NoDataBgMsg} />
            <img className={styles.noDataBgMsgStar} src={NoDataBgMsgStar} />
          </div>
        </div>
      </div>
    </div>
  );
};
