import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ModalWarnMessage from '@/components/ModalWarnMessage';

@connect(({ PHCLMOfClaimAssessmentController }) => ({
  decisionModalShowStatus: PHCLMOfClaimAssessmentController.decisionModalShowStatus,
}))
class DecisionModal extends Component {
  get getFooterButton() {
    return [
      <Button key="confirm" type="primary" onClick={this.hideConfirmModal}>
        {formatMessageApi({
          Label_BIZ_Claim: 'venus_claim.label.receivedModalOk',
        })}
      </Button>,
    ];
  }

  hideConfirmModal = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'PHCLMOfClaimAssessmentController/hideDecisionModal' });
  };

  render() {
    const { decisionModalShowStatus } = this.props;
    return (
      <div>
        {decisionModalShowStatus && (
          <ModalWarnMessage
            visible={decisionModalShowStatus}
            maskClosable={false}
            onOk={this.hideConfirmModal}
            closable={false}
            labelId="app.navigator.task-detail-policy-information-warn.msg.title"
            modalDetailText={formatMessageApi({
              Label_BIZ_Claim: 'venus_claim.detail-decision-warn',
            })}
            footer={this.getFooterButton}
            hiddenExtraText
          />
        )}
      </div>
    );
  }
}

export default DecisionModal;
