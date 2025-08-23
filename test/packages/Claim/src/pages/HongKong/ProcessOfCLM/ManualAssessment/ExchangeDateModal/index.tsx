import React, { Component } from 'react';
import { connect } from 'dva';
import { notification } from 'antd';
import type { Dispatch } from 'redux';
import ModalWarnMessage from '@/components/ModalWarnMessage';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import handleMessageModal from '@/utils/commonMessage';

interface IProps {
  dispatch: Dispatch<any>;
  claimProcessData: any;
  taskDetail: any;
  claimEntities: any;
  exchangeDateModalShowStatus: boolean;
  invoiceCurrencyObj: any;
}

@connect(({ HKCLMOfClaimAssessmentController }: any) => ({
  exchangeDateModalShowStatus: HKCLMOfClaimAssessmentController.exchangeDateModalShowStatus,
  claimProcessData: HKCLMOfClaimAssessmentController.claimProcessData,
  claimEntities: HKCLMOfClaimAssessmentController.claimEntities,
  invoiceCurrencyObj: HKCLMOfClaimAssessmentController.invoiceCurrencyObj,
}))
class InvoiceCurrencyModal extends Component<IProps> {
  onConfirmModal = async () => {
    const { dispatch, invoiceCurrencyObj } = this.props;
    dispatch({
      type: 'HKCLMOfClaimAssessmentController/hideExchangeDateModal',
      payload: {
        exchangeDateModalShowStatus: false,
      },
    });
    dispatch({
      type: 'HKCLMOfClaimAssessmentController/saveInvoiceItem',
      payload: {
        changedFields: { exchangeDate: invoiceCurrencyObj.exchangeDate },
        invoiceId: invoiceCurrencyObj.invoiceId,
      },
    });
    const response: any = await dispatch({
      type: 'HKCLMOfClaimAssessmentController/reAssessment',
    });
    if (response && response.success) {
      notification.success({
        message: 'Re-Assessment successfully!',
      });
    } else {
      handleMessageModal(response.promptMessages);
    }
  };

  onCancelModal = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'HKCLMOfClaimAssessmentController/hideExchangeDateModal',
      payload: {
        exchangeDateModalShowStatus: false,
      },
    });
  };

  render() {
    const { exchangeDateModalShowStatus } = this.props;

    return (
      <div>
        {exchangeDateModalShowStatus && (
          <ModalWarnMessage
            visible={exchangeDateModalShowStatus}
            maskClosable={false}
            onOk={this.onConfirmModal}
            onCancel={this.onCancelModal}
            closable={false}
            labelId="app.navigator.task-detail-policy-information-warn.msg.title"
            modalDetailText={formatMessageApi({ Label_COM_WarningMessage: 'MSG_000363' })}
          />
        )}
      </div>
    );
  }
}

export default InvoiceCurrencyModal;
