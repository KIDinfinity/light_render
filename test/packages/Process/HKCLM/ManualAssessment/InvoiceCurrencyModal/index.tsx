import React, { Component } from 'react';
import { NAMESPACE } from '../activity.config';

import { connect } from 'dva';
import type { Dispatch } from 'redux';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ModalWarnMessage from '@/components/ModalWarnMessage';

interface IProps {
  dispatch: Dispatch<any>;
  claimProcessData: any;
  taskDetail: any;
  claimEntities: any;
  currencyModalShowStatus: boolean;
  invoiceCurrencyObj: any;
}

@connect(({ [NAMESPACE]: modelnamepsace }: any) => ({
  currencyModalShowStatus: modelnamepsace.currencyModalShowStatus,
  claimProcessData: modelnamepsace.claimProcessData,
  claimEntities: modelnamepsace.claimEntities,
  invoiceCurrencyObj: modelnamepsace.invoiceCurrencyObj,
}))
class InvoiceCurrencyModal extends Component<IProps> {
  onConfirmModal = async () => {
    const { dispatch, invoiceCurrencyObj } = this.props;

    dispatch({
      type: `${NAMESPACE}/saveInvoiceItem`,
      payload: {
        changedFields: { invoiceCurrency: invoiceCurrencyObj.invoiceCurrency },
        invoiceId: invoiceCurrencyObj.invoiceId,
      },
    });

    await dispatch({
      type: 'commonClaimAssessmentController/reAssessment',
      payload: {
        nameSpace: NAMESPACE,
      },
    });
    dispatch({
      type: `${NAMESPACE}/hideCurrencyModal`,
      payload: {
        currencyModalShowStatus: false,
      },
    });
  };

  onCancelModal = () => {
    const { dispatch } = this.props;
    dispatch({
      type: `${NAMESPACE}/hideCurrencyModal`,
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
