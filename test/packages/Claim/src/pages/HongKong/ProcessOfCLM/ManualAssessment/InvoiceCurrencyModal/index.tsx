import React, { Component } from 'react';
import { connect } from 'dva';
import { notification } from 'antd';
import type { Dispatch } from 'redux';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ModalWarnMessage from '@/components/ModalWarnMessage';
import handleMessageModal from '@/utils/commonMessage';

interface IProps {
  dispatch: Dispatch<any>;
  claimProcessData: any;
  taskDetail: any;
  claimEntities: any;
  currencyModalShowStatus: boolean;
  invoiceCurrencyObj: any;
}

@connect(({ HKCLMOfClaimAssessmentController }: any) => ({
  currencyModalShowStatus: HKCLMOfClaimAssessmentController.currencyModalShowStatus,
  claimProcessData: HKCLMOfClaimAssessmentController.claimProcessData,
  claimEntities: HKCLMOfClaimAssessmentController.claimEntities,
  invoiceCurrencyObj: HKCLMOfClaimAssessmentController.invoiceCurrencyObj,
}))
class InvoiceCurrencyModal extends Component<IProps> {
  onConfirmModal = async () => {
    const { dispatch, invoiceCurrencyObj } = this.props;
    dispatch({
      type: 'HKCLMOfClaimAssessmentController/hideCurrencyModal',
      payload: {
        currencyModalShowStatus: false,
      },
    });
    dispatch({
      type: 'HKCLMOfClaimAssessmentController/saveInvoiceItem',
      payload: {
        changedFields: { invoiceCurrency: invoiceCurrencyObj.invoiceCurrency },
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
      type: 'HKCLMOfClaimAssessmentController/hideCurrencyModal',
      payload: {
        currencyModalShowStatus: false,
      },
    });
  };

  render() {
    const { currencyModalShowStatus } = this.props;

    return (
      <div>
        {currencyModalShowStatus && (
          <ModalWarnMessage
            visible={currencyModalShowStatus}
            maskClosable={false}
            onOk={this.onConfirmModal}
            onCancel={this.onCancelModal}
            closable={false}
            labelId="app.navigator.task-detail-policy-information-warn.msg.title"
            modalDetailText={formatMessageApi({ Label_COM_WarningMessage: 'MSG_000365' })}
          />
        )}
      </div>
    );
  }
}

export default InvoiceCurrencyModal;
