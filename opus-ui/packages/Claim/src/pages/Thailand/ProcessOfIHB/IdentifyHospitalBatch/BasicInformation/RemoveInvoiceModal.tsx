import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import ModalWarnMessage from '@/components/ModalWarnMessage';
import { formatMessageApi } from '@/utils/dictFormatMessage';

interface IProps {
  dispatch: Function;
  taskDetail: any;
  basicInforData: any;
  invoiceInforData: any;
  showRemoveInvoiceModal: boolean;
}

// @ts-ignore
@connect(({ IdentifyHospitalBatchController, processTask }) => ({
  showRemoveInvoiceModal: IdentifyHospitalBatchController.claimProcessData.showRemoveInvoiceModal,
  basicInforData: lodash.get(IdentifyHospitalBatchController, 'claimProcessData.basicInforData'),
  invoiceInforData: lodash.get(
    IdentifyHospitalBatchController,
    'claimProcessData.invoiceInforData'
  ),
  taskDetail: processTask.getTask,
}))
class removeInvoiceModal extends Component<IProps> {
  onConfirmModal = async () => {
    const { dispatch, taskDetail } = this.props;
    dispatch({
      type: 'IdentifyHospitalBatchController/removeInvoiceItem',
      payload: {},
    });
    const updateResponse = await dispatch({
      type: 'IdentifyHospitalBatchController/updateChangeFn',
      payload: { isUpdateTotalInvoiceNo: { updateTotalInvoiceNo: 1 }, taskId: taskDetail?.taskId },
    });
    if (updateResponse?.success) {
      dispatch({
        type: 'refreshInformation',
        payload: {
          taskId: taskDetail?.taskId,
        },
      })
    }
    this.hideRemoveModal();
  };

  onCancelModal = async () => {
    const { dispatch, invoiceInforData, basicInforData } = this.props;
    const invoiceInfoLength = lodash.size(invoiceInforData);
    basicInforData.totalNoOfInvoice = lodash.toString(invoiceInfoLength);

    dispatch({
      type: 'IdentifyHospitalBatchController/saveData',
      payload: {
        basicInforData,
      },
    });
    this.hideRemoveModal();
  };

  hideRemoveModal = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'IdentifyHospitalBatchController/saveData',
      payload: {
        showRemoveInvoiceModal: false,
      },
    });
  };

  render() {
    const { showRemoveInvoiceModal } = this.props;
    return (
      <div>
        {showRemoveInvoiceModal && (
          <ModalWarnMessage
            visible={showRemoveInvoiceModal}
            maskClosable={false}
            onOk={this.onConfirmModal}
            onCancel={this.onCancelModal}
            closable={false}
            labelId="app.navigator.task-detail-policy-information-warn.msg.title"
            modalDetailText={formatMessageApi({
              Label_COM_Message: 'MSG_000413',
            })}
          />
        )}
      </div>
    );
  }
}

export default removeInvoiceModal;
