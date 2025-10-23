import React, { Component } from 'react';
import type { Dispatch } from 'redux';
import { connect } from 'dva';
import { Modal, Icon } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { namespace } from '../_models';
import styles from './index.less';

interface IProps {
  dispatch: Dispatch;
  receivedModalShowStatus: boolean;
  documentStatusChangeStatus: boolean;
  taskDetail: any;
}

class ReceivedModal extends Component<IProps> {
  hideConfirmModal = () => {
    const { documentStatusChangeStatus, dispatch } = this.props;

    if (!documentStatusChangeStatus) {
      dispatch({ type: `${namespace}/hideConfirmModal` });
    }
  };

  changeDocumentStatus = () => {
    const { dispatch, taskDetail } = this.props;

    dispatch({
      type: `${namespace}/changeDocumentStatus`,
      payload: { taskDetail },
    });
  };

  render() {
    const { receivedModalShowStatus, documentStatusChangeStatus } = this.props;

    return (
      receivedModalShowStatus && (
        <Modal
          className={styles['received-modal']}
          visible
          centered
          maskClosable
          okText={formatMessageApi({ Label_BIZ_Claim: 'venus_claim.label.receivedModalOk' })}
          onOk={this.changeDocumentStatus}
          confirmLoading={documentStatusChangeStatus}
          cancelText={formatMessageApi({
            Label_BIZ_Claim: 'venus_claim.label.receivedModalCancel',
          })}
          onCancel={this.hideConfirmModal}
        >
          <Icon type="warning" theme="filled" style={{ fontSize: '20px', color: '#e6722d' }} />
          <span className={styles['received-modal_txt']}>
            {formatMessageApi({ Label_COM_WarningMessage: 'WRN_000006' })}
          </span>
        </Modal>
      )
    );
  }
}

export default connect(({ JPCLMOfQualityController }: any) => ({
  receivedModalShowStatus: JPCLMOfQualityController.receivedModalShowStatus,
  documentStatusChangeStatus: JPCLMOfQualityController.documentStatusChangeStatus,
}))(ReceivedModal);
