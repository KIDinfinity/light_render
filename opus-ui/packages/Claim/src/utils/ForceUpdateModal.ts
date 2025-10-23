import { formatMessageApi } from '@/utils/dictFormatMessage';
import { handleWarnMessageModal } from '@/utils/commonMessage';

export default ({ dispatch, showModal = true }: any) => {
  return new Promise((resolve) => {
    if (showModal) {
      handleWarnMessageModal(
        [
          {
            content: formatMessageApi({ Label_COM_WarningMessage: 'MSG_001374' }),
          },
        ],
        {
          cancelFn: () => {
            dispatch({
              type: 'task/updataTask',
              payload: {
                forceUpdateFlag: 'Y',
              },
            });

            resolve('');
            return;
          },
          okButtonProps: {
            style: { display: 'none' },
          },
          cancelText: 'Refresh screen',
          maskClosable: false,
          keyboard: false,
          closable: false,
        }
      );
    } else {
      dispatch({
        type: 'task/updataTask',
        payload: {
          forceUpdateFlag: 'Y',
        },
      });
    }
  });
};
