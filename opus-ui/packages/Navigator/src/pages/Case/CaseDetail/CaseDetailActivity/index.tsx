import React, { Component } from 'react';
import lodash from 'lodash';
import { Card } from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import ProcessStatus from 'navigator/enum/ProcessStatus';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';
import styles2 from '../MySteps2/MySteps2.less';
import MySteps2 from '../MySteps2/MySteps2';

const { Step } = MySteps2;

const assigneeList = [
  {
    code: 'SYSTEM',
    formatName: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.caseDetail.system',
    }),
  },
  {
    code: 'Cancelled',
    formatName: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.taskDetail.inquireForm.label.cancelled',
    }),
  },
  {
    code: 'AutoApproved',
    formatName: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.caseDetail.autoApproved',
    }),
  },
];
@connect(({ workspaceCases }) => ({
  activityList: workspaceCases?.activityList,
  caseCategory: workspaceCases?.infoData?.caseCategory,
}))
class CaseDeteailActivity extends Component {
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'workspaceCases/clearActivityList',
    });
  }

  currentActivity = (activityList = []) => {
    const inprogressIndex = lodash.findIndex(
      activityList,
      (item) => item?.processActivityStatus === ProcessStatus.inprogress
    );
    if (inprogressIndex !== -1) {
      return inprogressIndex;
    }
    return lodash.findLastIndex(activityList, (item) => item?.processActivityStatus !== null);
  };

  formatName = (code) => {
    const codeList = assigneeList.filter((list) => list.code === code);
    return codeList.length > 0 ? codeList[0].formatName : code;
  };

  renderMyStep = (activityList = [], caseCategory) =>
    lodash.map(activityList, (activity) => {
      const key = activity.processActivityKey;
      const branchProcessActList = lodash.get(activity, 'branchProcessActList');
      return (
        <span key={key}>
          {activity?.processActivityStatus &&
          activity?.processActivityStatus !== ProcessStatus.skip ? (
            <Step
              key={activity.id}
              title={
                formatMessageApi({ activity: key, caseCategory }) || activity.processActivityName
              }
              processActivityOrder={activity.processActivityOrder}
              processActivityStatus={activity.processActivityStatus}
              splitCaseSkip={activity.splitCaseSkip}
              status={formatMessageApi({ Label_BPM_TaskActivity: activity.processActivityStatus })}
              endTime={activity.endTime}
              description={
                <div className={styles2.desWapper}>
                  {activity?.processActivityStatus !== ProcessStatus.error && (
                    <span className={styles2.desName}>
                      {this.formatName(activity?.assigneeName) ||
                        this.formatName(activity?.assignee)}
                    </span>
                  )}
                  {activity?.startTime && (
                    <span className={styles2.desStartTime}>
                      {moment(activity.startTime).format('L LT')}
                    </span>
                  )}
                </div>
              }
            />
          ) : (
            <Step
              key={activity.id}
              title={
                formatMessageApi({ activity: key, caseCategory }) || activity.processActivityName
              }
              processActivityOrder={activity.processActivityOrder}
              processActivityStatus={activity.processActivityStatus}
              splitCaseSkip={activity.splitCaseSkip}
            />
          )}
          {lodash.isArray(branchProcessActList) ? (
            <MySteps2
              className={styles2.MySteps2Branch}
              current={this.currentActivity(branchProcessActList)}
              activityList={activityList}
            >
              {this.renderMyStep(branchProcessActList, caseCategory)}
            </MySteps2>
          ) : null}
        </span>
      );
    });

  render() {
    const { activityList, caseCategory } = this.props;
    return (
      <Card
        style={{ marginTop: '24px' }}
        bordered={false}
        className={`${styles.caseStep} ${styles['black-scroll']}`}
      >
        <MySteps2 current={this.currentActivity(activityList)} activityList={activityList}>
          {this.renderMyStep(activityList, caseCategory)}
        </MySteps2>
      </Card>
    );
  }
}

export default CaseDeteailActivity;
