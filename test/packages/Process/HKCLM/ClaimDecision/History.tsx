import React, { Component, PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import MigrateRemark from './MigrateRemark';
import TaskDetailHeader from 'claim/components/TaskDetailHeader';
import HistorySider from 'claim/pages/HistorySider';
import TaskStatus from 'basic/enum/TaskStatus';
import { NAMESPACE } from './activity.config';
import { HistoryComponent } from './index';
import styles from '../ClaimHistory/index.less';
import HeaderInfo from 'claim/components/HeaderInfo';
import moment from 'moment';

const layout = {
  xs: { span: 12 },
  sm: { span: 12 },
  md: { span: 12 },
  lg: { span: 12 },
};

class BasicInfo extends PureComponent {
  render() {
    const { caseNo, caseCategory, claimProcessData } = this.props;

    const list = [
      {
        title: formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.case-no',
        }),
        value: caseNo,
        jumpable: true,
        style: { cursor: 'pointer' },
      },
      {
        title: formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.case-category',
        }),
        value: formatMessageApi({ Label_BPM_CaseCategory: caseCategory }),
      },
      {
        title: formatMessageApi({
          Label_COM_General: 'BusinessNo',
        }),
        value: claimProcessData?.inquiryClaimNo,
      },
      {
        title: formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.submission-date',
        }),
        value: claimProcessData?.submissionDate
          ? moment(claimProcessData?.submissionDate).format('L')
          : null,
      }
    ];

    return <HeaderInfo list={list} processInstanceId={caseNo} caseCategory={caseCategory} />;
  }
}

@connect(({ [NAMESPACE]: modelnamespace, workspaceHistory, processTask }) => ({
  claimProcessData: modelnamespace.claimProcessData,
  getCaseNoByBusinessNo: workspaceHistory.getCaseNoByBusinessNo,
  processTask,
}))
class History extends Component {
  render() {
    const { claimProcessData, getCaseNoByBusinessNo }: any = this.props;
    const { claimAssuranceRemarkHistoryList } = claimProcessData
    return (
      <div>
        <TaskDetailHeader
          taskStatus=""
          title={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail.title.claim-inquiry',
          })}
          description={claimProcessData?.status === TaskStatus.reversed ? 'Reversed' : ''}
        >
          {claimProcessData && (
            <BasicInfo
              caseNo={getCaseNoByBusinessNo}
              caseCategory={claimProcessData.caseCategory}
              claimProcessData={claimProcessData}
            />
          )}
        </TaskDetailHeader>
        <div className={styles.container}>
          <HistorySider caseNo={getCaseNoByBusinessNo} claimProcessData={claimProcessData} modelnamespace={NAMESPACE} />
          <div className={`${styles.content} ${styles['black-scroll']}`}>
            <div className={styles.wrap}>
              <HistoryComponent />
              <MigrateRemark remarkList={claimAssuranceRemarkHistoryList} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default History;
