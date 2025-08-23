import React, { Component } from 'react';
import { Card } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ButtonOfSmall from 'claim/components/ButtonOfSmall';
import FlowUpHeader from './FlowUpHeader';
import FlowUpItem from './FlowUpItem';
import styles from './index.less';

interface FlowUpProps {
  followUpClaimList?: any;
  indirectClaimList: any;
  showAll: boolean;
  getClaimCaseData: any;
  refreshLoading: boolean;
  taskNotEditable: boolean;
  dispatch: any;
}

class FlowUp extends Component<FlowUpProps> {
  get flowUpList() {
    const { followUpClaimList, showAll, indirectClaimList }: any = this.props;
    // assessment节点显示所有follow up claim case
    if (showAll) return followUpClaimList;
    // qc节点显示直接关联的 follow up claim case
    const flowUpCaseList = lodash.filter(
      followUpClaimList,
      (item) => !lodash.includes(indirectClaimList, item.inquiryClaimNo)
    );

    return flowUpCaseList;
  }

  refreshFlowUp = async () => {
    const { dispatch, getClaimCaseData } = this.props;
    const claimCaseData = await getClaimCaseData();
    dispatch({
      type: 'followUpClaim/getFollowUpClaim',
      payload: claimCaseData,
    });
  };

  render() {
    const { refreshLoading, taskNotEditable } = this.props;
    const flowUpCaseList = this.flowUpList;

    return (
      <div className={styles.flowup}>
        <Card
          title={formatMessageApi({ Label_BIZ_Claim: 'venus-claim-label-flowUpClaim' })}
          extra={
            !taskNotEditable && (
              <ButtonOfSmall
                icon="sync"
                handleClick={this.refreshFlowUp}
                loading={refreshLoading}
              />
            )
          }
        >
          {!lodash.isEmpty(flowUpCaseList) && <FlowUpHeader />}
          {lodash.map(flowUpCaseList, (item) => (
            <FlowUpItem
              taskNotEditable={taskNotEditable}
              flowUpItem={item}
              key={item.inquiryClaimNo}
            />
          ))}
        </Card>
      </div>
    );
  }
}

export default connect(({ followUpClaim, loading, claimEditable }: any) => ({
  followUpClaimList: followUpClaim.followUpClaimList,
  indirectClaimList: followUpClaim.indirectClaimList,
  refreshLoading: loading.effects['followUpClaim/getFollowUpClaim'],
  taskNotEditable: claimEditable.taskNotEditable,
}))(FlowUp);
