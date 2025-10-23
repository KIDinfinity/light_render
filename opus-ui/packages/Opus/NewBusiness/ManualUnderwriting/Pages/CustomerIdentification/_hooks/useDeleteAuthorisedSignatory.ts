import { useCallback } from 'react';
import { useDispatch } from 'dva';
import { handleWarnMessageModal } from '@/utils/commonMessage';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { NAMESPACE } from '../activity.config';

export default () => {
  const dispatch = useDispatch();

  return useCallback(
    (id, parentId) => {
      handleWarnMessageModal(
        [
          {
            content: formatMessageApi({
              Label_COM_ErrorMessage: 'MSG_000746',
            }),
          },
        ],
        {
          okFn: async () => {
            dispatch({
              type: `${NAMESPACE}/deleteAuthorisedSignatory`,
              payload: {
                id,
                parentId,
              },
            });
          },
        }
      );
    },
    [dispatch]
  );
};
