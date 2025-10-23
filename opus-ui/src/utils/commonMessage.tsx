import tenant from '@/components/Tenant/tenantObj';
import { getMessageInfo } from '@/services/miscMessageInfoControllerService';
import { SS, SSKey } from '@/utils/cache';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import {
  validateResErrorTypeConfirm,
  validateResErrorTypeError,
  validateResErrorTypeWarn,
} from '@/utils/utils';
import { Modal } from 'antd';
import lodash from 'lodash';
import type { EModalWarnMessageType } from 'opus/Components/ModalWarnMessage';
import ModalWarnMessage from 'opus/Components/ModalWarnMessage';
import React from 'react';
import ReactDOM from 'react-dom';

interface Handler {
  onOk?: Function;
  type?:
    | EModalWarnMessageType.error
    | EModalWarnMessageType.warning
    | EModalWarnMessageType.info
    | EModalWarnMessageType.success;
}

const handleMessageModal = (promptMessages: any, handler?: Handler) => {
  const { onOk, type = 'error', hiddenExtraText = false } = handler || {};
  const isEscalate = lodash.some(promptMessages, { messageCode: 'MSG_001020' });
  const div: any = document.createElement('div');
  document.body.appendChild(div);
  const destroyFn = () => {
    ReactDOM.unmountComponentAtNode(div);
    div.parentNode.removeChild(div);
  };
  div.addEventListener('click', (e: any) => {
    e.stopPropagation();
  });
  div.setAttribute('class', 'commonModal');
  const warnMessageOkFn = (e: any) => {
    if (onOk) {
      onOk(e);
    }
    if (lodash.some(promptMessages, { messageCode: 'MSG_000827' }) || isEscalate) {
      location.reload();
    }
    destroyFn();
  };
  const modalDetailTextFn = () =>
    promptMessages &&
    promptMessages?.map(
      (item: any, idx: number) =>
        item.code !== 'MSG_COM_WRN' && (
          <li key={idx}>
            {formatMessageApi({
              Label_COM_ErrorMessage: item?.content || 'Error',
            })}
          </li>
        )
    );
  const okText = () => {
    if (isEscalate) {
      return formatMessageApi({
        Label_BPM_Button: 'Continue',
      });
    }

    return formatMessageApi({
      Label_BPM_Button: 'Close',
    });
  };
  ReactDOM.render(
    <ModalWarnMessage
      visible
      closable={false}
      maskClosable={false}
      onOk={warnMessageOkFn}
      // labelId="app.navigator.task-detail-policy-information-warn.msg.title"
      modalDetailText={<ul style={{ textAlign: 'left' }}>{modalDetailTextFn()}</ul>}
      okText={okText()}
      hideCancelButton={true}
      hiddenExtraText={isEscalate || hiddenExtraText}
      type={type}
    />,
    div
  );
  return promptMessages;
};
const handleInError = () => {
  const systemSupportEmailAddress = SS.getItem(SSKey.SUPPORTEMail, false);
  handleMessageModal([
    {
      code: '1',
      content: `This task failed to submit, we have informed system support to investigate the error, you may contact ${systemSupportEmailAddress} for more detail.`,
    },
  ]);
};
const handleWarnMessageModal = (
  promptMessages: any[],
  { okFn, cancelFn, leftCancelFn, ...options }: any
) => {
  const div: any = document.createElement('div');
  document.body.appendChild(div);
  const destroyFn = () => {
    ReactDOM.unmountComponentAtNode(div);
    div.parentNode.removeChild(div);
  };
  div.addEventListener('click', (e: any) => {
    e.stopPropagation();
  });
  div.setAttribute('class', 'commonModal');
  const warnMessageCancelFn = (e: any, isTopRight: boolean) => {
    if (cancelFn) {
      cancelFn(e, isTopRight);
    }
    destroyFn();
  };
  const warnMessageOkFn = (e: any) => {
    if (okFn) {
      okFn(e);
    }
    destroyFn();
  };

  const leftCancel = (e: any) => {
    destroyFn();
  };
  const modalDetailTextFn = () =>
    promptMessages &&
    promptMessages?.map(
      (item: any, idx: number) =>
        item.code !== 'MSG_COM_WRN' && (
          <li key={idx} style={{ whiteSpace: 'pre-line' }}>
            {item.content}
          </li>
        )
    );

  ReactDOM.render(
    <ModalWarnMessage
      visible
      closable={false}
      maskClosable={false}
      onCancel={warnMessageCancelFn}
      onOk={warnMessageOkFn}
      leftCancelFn={leftCancelFn ? leftCancel : ''}
      // labelId="app.navigator.task-detail-policy-information-warn.msg.title"
      modalDetailText={<ul style={{ textAlign: 'left' }}>{modalDetailTextFn()}</ul>}
      okText={
        options?.okText ||
        formatMessageApi({
          Label_BPM_Button: 'Confirm',
        })
      }
      cancelText={
        options?.cancelText ||
        formatMessageApi({
          Label_COM_Opus: 'cancel',
        })
      }
      {...options}
    />,
    div
  );
};

const handleSuccessMessageModal = (
  message: string | React.ReactNode | React.ReactNode[],
  { okFn, okText, ...props }: any
) => {
  Modal.success({
    className: 'success-modal',
    content: message,
    onOk: okFn,
    okText: okText || 'GOT IT',
    ...props,
  });
};

const handleErrorMessageIgnoreXErrorNotice = (response: any) => {
  if (
    !validateResErrorTypeError(response) &&
    !validateResErrorTypeWarn(response) &&
    !validateResErrorTypeConfirm(response)
  ) {
    const promptMessages = lodash.get(response, 'promptMessages', []);
    return handleMessageModal(promptMessages);
  }
  return false;
};

interface IMessageParam {
  typeCode: string;
  dictCode: string;
  args?: [];
  okText?: string;
  code?: string;
}

const requestMessage = async (messages: IMessageParam, options?: any) => {
  const region = tenant.region();
  const { typeCode, dictCode, args } = messages;
  const response = await getMessageInfo({ typeCode, dictCode, args: args || [], region });

  if (lodash.isPlainObject(response) && response?.success && !lodash.isEmpty(response.resultData)) {
    const messageLevel: string = response?.resultData?.messageLevel;
    const okText = messages?.okText;
    const code = messages?.code;

    switch (messageLevel) {
      case '1':
        break;
      case '2':
        // warn
        handleWarnMessageModal([{ content: response?.resultData?.content }], options);
        break;
      case '3':
        // error

        if (okText) {
          Modal.error({
            content: response?.resultData?.content,
            okText,
          });
        } else {
          handleMessageModal(
            [
              {
                content: response?.resultData?.content,
                code,
              },
            ],
            options
          );
        }
        break;
      default:
        break;
    }
  }
};

const messageModal = (messages: IMessageParam, options?: any) => {
  if (lodash.isPlainObject(messages)) {
    requestMessage(messages, options);
  }

  if (lodash.isArray(messages)) {
    lodash.map(messages, (item) => {
      requestMessage(item);
    });
  }
};

export default handleMessageModal;
export {
  handleMessageModal,
  handleInError,
  handleWarnMessageModal,
  messageModal,
  handleErrorMessageIgnoreXErrorNotice,
  handleSuccessMessageModal,
};
