import React from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { Icon } from 'antd';
import classNames from 'classnames';
import { getRemainingTimeStr } from '@/utils/utils';
import borderUrgentIcon from '@/assets/border-urgent.svg';
import { ReactComponent as clockIcon } from 'bpm/assets/clock.svg';
import Capitalize from './Capitalize';
import styles from './Title.less';

export default React.memo(({ title = '', status = '', urgent = false, slaTime = 0 }: any) => {
  const activeLanguage = useSelector((state: any) => state.language.activeLanguage);
  const isDanger = lodash.isNumber(slaTime) && slaTime <= 0;

  return (
    <div className={styles.title}>
      {urgent && (
        <div className={styles.urgent}>
          <img src={borderUrgentIcon} alt="urgent" />
        </div>
      )}

      <div className={styles.text}>
        <Capitalize
          title={lodash.toUpper(title || '')}
          normalTitleClassName={styles.lowercase}
          upperTitleClassName={styles.uppercase}
          activeLanguage={activeLanguage}
        />
        {status && (
          <div
            className={classNames(styles.tip, {
              [styles.danger]: isDanger,
            })}
          >
            {lodash.toUpper(status)}
            {slaTime !== false && (
              <div className={styles.sla}>
                <Icon component={clockIcon} />
                <span>{getRemainingTimeStr(slaTime)}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
});
