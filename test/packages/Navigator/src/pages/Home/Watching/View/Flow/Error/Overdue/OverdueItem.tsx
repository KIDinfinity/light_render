import React, { PureComponent } from 'react';
import { Progress, Icon } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { getRemainingTimeStr } from '@/utils/utils';
import { ReactComponent as IconHandle } from 'navigator/assets/icon-handle.svg';
import classNames from 'classnames';
import styles from './OverdueItem.less';

class Overdueitem extends PureComponent {
  render() {
    const { item, minHeight }: any = this.props;
    return (
      <div className={classNames(styles.overdueItem, minHeight ? styles.minOverdueItem : '')}>
        <p>
          <span>
            {formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.case-no',
            })}{' '}
            {item.processInstanceId}
          </span>
          <span className={styles.overdueFr}>{item?.activityName}</span>
        </p>
        <p>
          <span>
            {formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.index.mode.flow.detail.overdue-taskReamainingTime',
            })}
          </span>
          <span>{getRemainingTimeStr(item?.remainingTime, item?.slaUnit)}</span>
        </p>
        <Progress
          percent={Number.isNaN(+item.slaPercent) ? 0 : +item.slaPercent}
          size="small"
          strokeColor={item.slaPercent > 100 ? '#dc6374' : '#7BCC92'}
          showInfo={false}
        />
        <p>
          <span>
            {formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.index.mode.flow.detail.overdue-caseReamainingTime',
            })}
          </span>
          <span>{getRemainingTimeStr(item?.caseRemainingTime, item?.slaUnit)}</span>
        </p>
        <Progress
          percent={Number.isNaN(+item.caseSlaPercent) ? 0 : +item.caseSlaPercent}
          size="small"
          strokeColor={item.caseSlaPercent > 100 ? '#dc6374' : '#7BCC92'}
          showInfo={false}
        />
        <p className={styles.overdueTr}>
          <Icon component={IconHandle} className={styles.overdueImg} />
          {formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.taskDetail.inquireForm.label.assignee',
          })}
          {': '}
          {item.assignee}
        </p>
      </div>
    );
  }
}

export default Overdueitem;
