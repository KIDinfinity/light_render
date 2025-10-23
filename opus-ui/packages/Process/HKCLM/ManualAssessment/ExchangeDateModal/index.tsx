import React, { Component } from 'react';
import { NAMESPACE } from '../activity.config';

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

@connect(({ [NAMESPACE]: modelnamepsace }: any) => ({
  exchangeDateModalShowStatus: modelnamepsace.exchangeDateModalShowStatus,
  claimProcessData: modelnamepsace.claimProcessData,
  claimEntities: modelnamepsace.claimEntities,
  invoiceCurrencyObj: modelnamepsace.invoiceCurrencyObj,
}))
class InvoiceCurrencyModal extends Component<IProps> {
  onConfirmModal = async () => {
    const { dispatch, invoiceCurrencyObj } = this.props;
    dispatch({
      type: `${NAMESPACE}/hideExchangeDateModal`,
      payload: {
        exchangeDateModalShowStatus: false,
      },
    });
    dispatch({
      type: `${NAMESPACE}/saveInvoiceItem`,
      payload: {
        changedFields: { exchangeDate: invoiceCurrencyObj.exchangeDate },
        invoiceId: invoiceCurrencyObj.invoiceId,
      },
    });
    const response: any = await dispatch({
      type: `${NAMESPACE}/reAssessment`,
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
      type: `${NAMESPACE}/hideExchangeDateModal`,
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
