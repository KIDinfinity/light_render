import lodash from 'lodash';
import { handleWarnMessageModal, handleMessageModal } from '@/utils/commonMessage';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import bpm from 'bpm/pages/OWBEntrance';

export const warnMessageModal = async (messages: any[], okFeed?: any, cancelFeed?: any) => {
  const messageWrap = lodash.map(messages, (message: any) => ({
    content: formatMessageApi(message),
  }));

  const output = await new Promise((resolve) => {
    handleWarnMessageModal(messageWrap, {
      okFn: async () => {
        resolve(okFeed);
      },
      cancelFn: () => {
        (bpm as any).clearSubmitButtonErrors();
        resolve(cancelFeed);
      },
    });
  }).then((result) => {
    return result;
  });

  return output;
};

export const errorMessageModal = async (messages: any[], feed?: any) => {
  const messageWrap = lodash.map(messages, (message: any, index: any) => ({
    content: formatMessageApi(message),
    code: `error-${index}`,
  }));

  const output = await new Promise((resolve) => {
    handleMessageModal(messageWrap, {
      onOk: () => {
        resolve(feed);
      },
    });
  }).then((result) => {
    return result;
  });

  return output;
};
/**
 * errorMessageWithValuesModal
 * @param messages messages with values to replace slot
 * @param feed
 */
export const errorMessageWithValuesModal = async (messages: any[], feed?: any) => {
  const messageWrap = lodash.map(messages, (message: any, index: any) => ({
    content: formatMessageApi(message, ...(message?.values || [])),
    code: `error-${index}`,
  }));

  const output = await new Promise((resolve) => {
    handleMessageModal(messageWrap, {
      onOk: () => {
        resolve(feed);
      },
    });
  }).then((result) => {
    return result;
  });

  return output;
};
