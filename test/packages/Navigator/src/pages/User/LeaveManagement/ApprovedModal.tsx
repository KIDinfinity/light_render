import React from 'react';
import { Button, Descriptions, message, Modal } from 'antd';
import {
  getPersonalLeaveRequestInfo,
  waivePersonalLeaveRequest,
} from '@/services/userCenterUserLeaveRequestControllerService';
import ReactDOM from 'react-dom';
import './ApprovedModal.less';

export const ModalContent = ({ userName, leaveTime, reason }: any) => {
  return (
    <Descriptions column={1}>
      {userName && <Descriptions.Item label="User Name">{userName}</Descriptions.Item>}
      <Descriptions.Item label="Leave Time">{leaveTime}</Descriptions.Item>
      <Descriptions.Item label="Reason">{reason}</Descriptions.Item>
    </Descriptions>
  );
};

export const WaiveModal = ({ content, visible, onCancel, footer }: any) => {
  return (
    <Modal visible={visible} onCancel={onCancel} footer={footer} wrapClassName="waive-modal">
      {content}
    </Modal>
  );
};

export const popup = async ({ waiveAuth, dispatch, showUserName, ...props }: any) => {
  const info = await getPersonalLeaveRequestInfo({
    ...props,
  });

  if (!info?.resultData?.user) {
    message.error('[service error]: getPersonalLeaveRequestInformation fail!');
    return;
  }

  const div = document.createElement('div');
  document.body.appendChild(div);

  const onCancel = () => {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  };

  const onWaive = async () => {
    const result = await waivePersonalLeaveRequest({
      caseNo: info.resultData.caseNo,
      sortOrder: info.resultData.sortOrder,
      userId: info.resultData.user.userId,
    });
    if (result?.success) {
      message.success('Success');
    } else {
      message.error('[service error]: waivePersonalLeaveRequest fail!');
    }
    await dispatch({
      type: `leaveManagement/updateCalendarLeaveData`,
    });
    onCancel();
  };

  const modalProps = {
    content: (
      <ModalContent
        userName={showUserName && info.resultData.user.userName}
        leaveTime={`${info.resultData.startTime} - ${info.resultData.endTime}`}
        reason={info.resultData.reason}
      />
    ),
    visible: true,
    onCancel,
    footer: waiveAuth ? <Button onClick={onWaive}>Waive</Button> : null,
  };

  ReactDOM.render(<WaiveModal {...modalProps} />, div);
};
