import { handleWarnMessageModal, handleMessageModal } from '@/utils/commonMessage';

const MessageModal = (response: any) => {
  return new Promise((resolve: any) => {
    if (response?.warnData?.['x-warn-nonce']) {
      handleWarnMessageModal(response.promptMessages, {
        okFn: async () => {
          resolve(true);
        },
        cancelFn: () => {
          resolve(false);
        },
      });
    } else if (response?.warnData?.['x-warn-prompt']) {
      handleWarnMessageModal(response.promptMessages, {
        okFn: async () => {
          resolve(true);
        },
        cancelFn: async () => {
          resolve(false);
        },
      });
    } else if (response?.warnData?.['x-error-nonce']) {
      handleMessageModal(response?.promptMessages);
      resolve(false);
    } else {
      resolve(false);
    }
  });
};

export default MessageModal;
