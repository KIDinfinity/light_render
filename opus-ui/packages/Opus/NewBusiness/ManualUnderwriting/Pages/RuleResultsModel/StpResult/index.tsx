import React from 'react';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Header from '../Header';
import styles from './index.less';

const StpResult = ({ data }: any) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>{formatMessageApi({ Label_COM_General: 'StpResult' })}</span>
        <Header data={data} />
      </div>
      <div className={styles.center}>
        <div className={styles.titleHeader}>
          <span className={styles.titleLeft}>
            {formatMessageApi({ Label_RUL_Rule: 'RuleName' })}
          </span>
          <span className={styles.titleCenter}>
            {formatMessageApi({ Label_COM_General: 'Result' })}
          </span>
          <span className={styles.titleRight}>
            {formatMessageApi({ Label_COM_General: 'Remark' })}
          </span>
        </div>
        <div>
          {lodash.map(data?.resultData?.wooResults || [], (item: any) => {
            return (
              <div className={styles.detail}>
                <span className={styles.titleLeft}>{item.ruleName}</span>
                <span className={styles.titleCenter}>{item.ruleDecision}</span>
                <span className={styles.titleRight}>
                  {lodash.join(item?.remarkList || [], '; ')}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StpResult;
