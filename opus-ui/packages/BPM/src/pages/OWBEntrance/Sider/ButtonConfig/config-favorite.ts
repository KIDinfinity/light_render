import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import { getUserInfo } from '@/utils/utils';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import getInitFavoritStatus from './getInitFavoritStatus';
import { ButtonStatus } from '../../constants';

export default async ({ taskId, contextDispatch }: any) => {
  const userId = lodash.get(getUserInfo(), 'userId');
  const status = await getInitFavoritStatus({ userId, taskId });

  return {
    isShowNotice: false,
    initStatus: status === 1 ? ButtonStatus.Active : ButtonStatus.Default,
    after: async () => {
      const currentStatus = await getInitFavoritStatus({ userId, taskId });
      contextDispatch({
        type: 'setButtonStatus',
        payload: {
          buttonCode: 'favorite',
          status: currentStatus === 1 ? ButtonStatus.Active : ButtonStatus.Default,
        },
      });
      return {
        message: {
          success: () =>
            currentStatus === 0
              ? formatMessageApi({
                  Label_COM_WarningMessage: 'venus_bpm.message.favorite.inactive',
                })
              : formatMessageApi({ Label_COM_WarningMessage: 'venus_bpm.message.favorite.active' }),
        },
      };
    },
    action: async () => {
      return {
        1: objectToFormData({
          userId,
          taskId,
        }),
      };
    },
  };
};
