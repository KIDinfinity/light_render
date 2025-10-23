import React from 'react';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Header from '../Header';
import styles from './index.less';

const UWMEResult = ({ data }: any) => {
  const dataDetail = data?.resultData?.uwmeRule;
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>
          {formatMessageApi({ Label_COM_General: 'UWMEResult' })}
        </span>
        <Header data={data} />
      </div>
      <div className={styles.policyUwmeRule}>
        <div className={styles.policyfield}>
          <div className={styles.PolicyNo}>
            {formatMessageApi({ Label_BIZ_Policy: 'PolicyNo' })}&nbsp;
            {dataDetail?.policyUwmeRule?.policyNo}
          </div>
          <div>
            <span className={styles.UWMED}>
              {formatMessageApi({ Label_COM_General: 'UWMEDecision' })}
            </span>
            <span className={styles.UWMEDecision}>{dataDetail?.policyUwmeRule?.uwmeDecision}</span>
          </div>
        </div>
        <div className={styles.policyList}>
          <div className={styles.policyTitle}>
            {formatMessageApi({ Label_BIZ_Policy: 'Reason' })}
          </div>
          {lodash.map(dataDetail?.policyUwmeRule.reasonList, (item: any) => {
            return <div className={styles.policyReason}>{item}</div>;
          })}
        </div>
      </div>
      {lodash.map(dataDetail?.clientUwmeRules, (item: any) => {
        return (
          <div className={styles.policyUwmeRule}>
            <div className={styles.policyfield}>
              <div className={styles.PolicyNo}>
                {formatMessageApi({ Label_BIZ_Individual: 'ClientName' })}&nbsp;
                {item.clientName}
              </div>
              <div>
                <span className={styles.UWMED}>
                  {formatMessageApi({ Label_COM_General: 'UWMEDecision' })}
                </span>
                <span className={styles.UWMEDecision}>{item.uwmeDecision}</span>
              </div>
            </div>
            <div className={styles.policyList}>
              <div className={styles.policyTitle}>
                {formatMessageApi({ Label_BIZ_Policy: 'Reason' })}
              </div>
              {lodash.map(item?.reasonList, (reasonListItem: any) => {
                return <div className={styles.policyReason}>{reasonListItem}</div>;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UWMEResult;
