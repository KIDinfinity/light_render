import ModalWarnMessage from '@/components/ModalWarnMessage';
import tenant from '@/components/Tenant/tenantObj';
import { getMessageInfo } from '@/services/miscMessageInfoControllerService';
import { SS, SSKey } from '@/utils/cache';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import {
  validateResErrorTypeConfirm,
  validateResErrorTypeError,
  validateResErrorTypeWarn,
} from '@/utils/utils';
import { Icon, Modal } from 'antd';
import lodash from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';

const handleMessageModal = (promptMessages: any, handler?: any) => {
  if (!promptMessages || promptMessages?.length === 0) {
    return false;
  }
  const { onOk } = handler || {};

  const handleOK = (e: Function) => {
    if (lodash.isFunction(onOk)) {
      onOk();
    }
    if (
      lodash.some(promptMessages, { messageCode: 'MSG_000827' }) ||
      lodash.some(promptMessages, { messageCode: 'MSG_001020' })
    ) {
      location.reload();
    }
    lodash.isFunction(e) && e();
  };

  Modal.error({
    title: formatMessageApi({
      Label_COM_Message: 'ErrorMessage',
    }),
    className: 'claim-error-modal',
    content: (
      <div>
        {promptMessages &&
          promptMessages.length > 0 &&
          lodash
            .uniqBy(
              lodash.map(promptMessages, (item) => ({
                ...item,
                uniqKey: item?.content,
              })),
              'uniqKey'
            )
            .map((item: any, index: number) => (
              <div key={item?.code || `message_${index}`}>
                <Icon type="exclamation-circle" theme="filled" style={{ fontSize: '14px' }} />
                <span style={{ wordBreak: 'break-word', marginLeft: 8 }}>
                  {formatMessageApi({
                    Label_COM_ErrorMessage: item?.content || 'Error',
                  })}
                </span>
              </div>
            ))}
      </div>
    ),
    onOk: handleOK,
    okText: 'GOT IT',
  });
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
const handleWarnMessageModal = (promptMessages: [any], { okFn, cancelFn, ...options }: any) => {
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
  const modalDetailTextFn = () =>
    promptMessages &&
    promptMessages?.map(
      (item: any, idx: number) => item.code !== 'MSG_COM_WRN' && <li key={idx}>{item.content}</li>
    );

  ReactDOM.render(
    <ModalWarnMessage
      visible
      onCancel={warnMessageCancelFn}
      onOk={warnMessageOkFn}
      labelId="app.navigator.task-detail-policy-information-warn.msg.title"
      modalDetailText={<ul style={{ textAlign: 'left' }}>{modalDetailTextFn()}</ul>}
      okText={
        options?.okText ||
        formatMessageApi({
          Label_BPM_Button: 'app.navigator.drawer.messager.button.yes',
        })
      }
      cancelText={
        options?.cancelText ||
        formatMessageApi({
          Label_BPM_Button: 'app.navigator.drawer.messager.button.no',
        })
      }
      {...options}
    />,
    div
  );
};

const handleSuccessMessageModal = (message: string, { okFn, okText }: any, centered = false) => {
  Modal.success({
    className: 'success-modal',
    content: message,
    onOk: okFn,
    okText: okText || 'GOT IT',
    centered,
  });
};

const handleErrorMessageIgnoreXErrorNotice = (response: any) => {
  if (
    !validateResErrorTypeError(response) &&
    !validateResErrorTypeWarn(response) &&
    !validateResErrorTypeConfirm(response)
  ) {
    console.log('hello', response);
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
