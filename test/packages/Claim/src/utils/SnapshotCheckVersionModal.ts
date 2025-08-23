import moment from 'moment';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { handleWarnMessageModal } from '@/utils/commonMessage';

export default ({ userName, versionNo }) => {
  return new Promise((resolve) => {
    handleWarnMessageModal(
      [
        {
          content: formatMessageApi(
            { Label_COM_WarningMessage: 'MSG_000743' },
            userName,
            moment(versionNo).format('L HH:mm:ss')
          ),
        },
      ],
      {
        okFn: async () => {
          resolve('');
        },
        cancelFn: () => {
          window.location.reload();
          return;
        },
        okText: 'Continue',
        cancelText: 'Refresh screen',
        maskClosable: false,
        keyboard: false,
        closable: false,
      }
    );
  });
};
