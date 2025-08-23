import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import TaskDetailHeader from 'claim/components/TaskDetailHeader';
import HistorySider from 'claim/pages/HistorySider';
import BasicInfo from '../../Components/BasicInfo';
import styles from './index.less';

@connect(({ mjProcessController, workspaceHistory }: any) => ({
  claimHistory: mjProcessController.claimHistory,
  getCaseNoByBusinessNo: workspaceHistory.getCaseNoByBusinessNo,
}))
class APOfManualAssessment extends Component {
  componentDidMount = () => {};

  componentWillUnmount = () => {
    const { dispatch }: any = this.props;
    dispatch({
      type: 'mjProcessController/clear',
    });
  };

  render() {
    const { claimHistory, getCaseNoByBusinessNo }: any = this.props;

    const claimNo = lodash.get(claimHistory, 'claimNo');
    const caseCategory = lodash.get(claimHistory, 'caseCategory');
    return (
      <>
        <TaskDetailHeader
          taskStatus=""
          title={formatMessageApi({
            Label_BIZ_Claim: 'venus-claim-label-majorInquiry',
          })}
        >
          {claimHistory && (
            <BasicInfo
              caseNo={getCaseNoByBusinessNo}
              caseCategory={caseCategory}
              claimProcessData={claimHistory}
            />
          )}
        </TaskDetailHeader>
        <div className={styles.container}>
          <HistorySider
            caseNo={getCaseNoByBusinessNo}
            claimNo={claimNo}
            caseCategory={caseCategory}
          />
          <div className={`${styles.content} ${styles['black-scroll']}`}>
            <div className={styles.wrap} />
          </div>
        </div>
      </>
    );
  }
}

export default APOfManualAssessment;
