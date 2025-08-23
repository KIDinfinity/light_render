import React, { Component } from 'react';
import { Button } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import lodash from 'lodash';
import styles from './index.less';

interface IProps {
  dispatch: Dispatch;
  confirmLoading: boolean;
  isCanConfirm: boolean;
}
@connect(({ claimEditable }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
}))
class Confirm extends Component<IProps> {
  handlerConfirm = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'UnknownDocumentController/confirm',
    });
  };

  render() {
    const { confirmLoading, isCanConfirm, taskNotEditable } = this.props;
    return (
      <div className={styles.btnWrap}>
        <Button
          onClick={this.handlerConfirm}
          loading={confirmLoading}
          disabled={isCanConfirm || taskNotEditable}
        >
          {formatMessageApi({
            Label_BPM_Button: 'venus_claim.button.confirm',
          })}
        </Button>
      </div>
    );
  }
}

export default connect(({ loading, UnknownDocumentController }: any) => ({
  confirmLoading: loading.effects['UnknownDocumentController/confirm'],
  isCanConfirm: lodash.isEmpty(UnknownDocumentController.searchResultRowKeys),
}))(Confirm);
