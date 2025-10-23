import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Icon } from 'antd';
import { isFunction } from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ModalWarnMessage from '@/components/ModalWarnMessage';
import styles from './udMessage.less';

export const enterClaimPage = () => {
  const COMMON_TASK_PATH = '/process/task/detail/';
  const { pathname } = window.location;
  return pathname.indexOf(COMMON_TASK_PATH) !== -1;
};

const handleUDMessageModel = (message, { onOkFn }) => {
  const mountNode = document.createElement('div');
  document.body.appendChild(mountNode);
  const destroyFn = () => {
    ReactDOM.unmountComponentAtNode(mountNode);
    document.body.removeChild(mountNode);
  };
  const udMessageCancelFn = () => {
    destroyFn();
  };
  const udMessageOkFn = async () => {
    if (onOkFn && isFunction(onOkFn)) {
      await onOkFn();
    }
    destroyFn();
  };

  ReactDOM.render(
    <ModalWarnMessage
      visible
      onCancel={udMessageCancelFn}
      onOk={udMessageOkFn}
      labelId="app.navigator.task-detail-policy-information-warn.msg.title"
      modalDetailText={message}
      okText={formatMessageApi({
        Label_BPM_Button: 'app.navigator.taskDetail.inquireForm.button.confirmAndContinue',
      })}
      cancelText={formatMessageApi({
        Label_BPM_Button: 'app.navigator.taskDetail.inquireForm.button.cancel',
      })}
    />,
    mountNode
  );
};

export function handleUDWarnMessage(message, { onOkFn }) {
  Modal.warning({
    className: styles.warnMsg,
    width: '486px',
    content: (
      <div className="modal-main">
        <div className="modal-title">
          <Icon type="warning" theme="filled" />
          {formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-policy-information-warn.msg.title',
          })}
        </div>
        <div className="modal-ctn">
          <div className="modal-detail">{message}</div>
        </div>
      </div>
    ),
    okText: formatMessageApi({
      Label_BPM_Button: 'app.navigator.taskDetail.inquireForm.button.confirmAndContinue',
    }),
    onOk: onOkFn,
  });
}

export default handleUDMessageModel;
