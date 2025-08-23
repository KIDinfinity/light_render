import React, { useMemo } from 'react';
// @ts-ignore
import { Icon, Tooltip } from 'antd';
import classnames from 'classnames';
import { toUpper } from 'lodash';
import { FormateEP } from '@/utils/accuracy/Tools';
import Config, { getDefaultConf, BusinessType } from './config';
import styles from './index.less';

import type { ISubmissionData, IBusinessType } from './type.d';

const SubmissionItem = React.memo(
  ({
    color,
    region,
    submission_channel,
    order,
    stp_rate,
    total_count,
    businessType,
  }: ISubmissionData) => {
    // @ts-ignore
    const target = useMemo(() => Config[toUpper(region)] || getDefaultConf(region), [region]);
    return (
      <div
        className={classnames({
          [styles.submissionBox]: true,
          'chart-submissionBox': true,
        })}
        data-total_count={total_count}
        data-stp_rate={stp_rate}
        data-region={region}
        style={{ '--order': order } as React.CSSProperties}
      >
        <div
          className={styles.itemLeft}
          style={
            {
              '--item-left-bg': color || target?.color,
            } as React.CSSProperties
          }
        >
          <div className={styles.region}>
            <Icon style={{ fontSize: '24px' }} component={target?.icon} />
            <div className={styles.title}>{target?.title}</div>
          </div>
          <div className={styles.project}>
            <Tooltip
              title={toUpper(submission_channel)}
              getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
            >
              {toUpper(submission_channel)}
            </Tooltip>
          </div>
        </div>
        <div className={styles.itemRight}>
          <div
            className={classnames({
              [styles.policy]: true,
              [styles.rightItem]: true,
            })}
          >
            <div className={styles.data}>
              {!!total_count
                ? FormateEP?.getThousandsFormat({
                    value: total_count || 0,
                    precision: 2,
                  })
                : '--'}
            </div>
            <div className={styles.text}>
              {businessType === BusinessType.NB ? 'Policies' : 'Applications'}
            </div>
          </div>
          <div
            className={classnames({
              [styles.stp]: true,
              [styles.rightItem]: true,
            })}
          >
            <div className={classnames({ [styles.data]: true, [styles.stpData]: true })}>
              {!!stp_rate ? `${stp_rate}%` : '--'}
            </div>
            <div className={styles.text}>STP Rate</div>
          </div>
        </div>
      </div>
    );
  }
);

const Submission = React.memo(
  ({
    submission,
    businessType,
  }: {
    submission: ISubmissionData[];
    businessType: IBusinessType;
  }) => {
    return (
      <div
        className={classnames('submission-container', styles.submissionContainer)}
        key={businessType}
      >
        <div className={styles.submissionTitle}>
          MTD<span className={styles.type}>{toUpper(businessType)}</span>SUBMISSION
        </div>
        <div className={styles.submissionContent}>
          {submission?.map?.((item: any) => (
            <SubmissionItem
              color={item?.color}
              order={item?.order}
              region={item?.region}
              submission_channel={item?.submission_channel}
              extraClass={item?.extraClass}
              total_count={item?.total_count}
              stp_rate={item?.stp_rate}
              key={`${item?.region}_${item?.submission_channel}`}
              businessType={businessType}
            />
          ))}
        </div>
      </div>
    );
  }
);

export default Submission;
