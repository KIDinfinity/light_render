import React from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { Icon } from 'antd';
import classNames from 'classnames';
import { getRemainingTimeStr } from '@/utils/utils';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ReactComponent as clockIcon } from 'bpm/assets/timer.svg';
import Capitalize from './Capitalize';
import styles from './Title.less';

export default React.memo(
  ({ title = '', status = '', slaTime = 0, appealFlag = '', overdueTimeRender }: any) => {
    const activeLanguage = useSelector((state: any) => state.language.activeLanguage);
    const isDanger = lodash.isNumber(slaTime) && slaTime <= 0;
    return (
      <div className={styles.title}>
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
                  {React.isValidElement(overdueTimeRender) ? (
                    React.cloneElement(overdueTimeRender)
                  ) : (
                    <div className={styles.slaContent}>
                      {' '}
                      {formatMessageApi({ Label_BIZ_Claim: 'slaRemains' })}{' '}
                      {getRemainingTimeStr(slaTime)}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        {appealFlag === 1 ? <div className={styles.flag}>Reversed</div> : null}
      </div>
    );
  }
);
