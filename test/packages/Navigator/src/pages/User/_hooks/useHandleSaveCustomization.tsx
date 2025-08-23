import { changeTheme } from '@/global';
import { SS, SSKey } from '@/utils/cache';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { notification } from 'antd';
import { useDispatch } from 'dva';
import { useCallback } from 'react';
import useRenderModel from './useRenderModel';

export default (model: any) => {
  const result = useRenderModel(model);
  const dispatch = useDispatch();
  const handleSaveCustomization = useCallback(() => {
    if (result) {
      (async () => {
        SS.removeItem(SSKey.TaskMode);
        await dispatch({
          type: 'customization/saveCustomization',
        });
        changeTheme();
        notification.success({
          message: formatMessageApi({ Label_BIZ_Claim: 'app.usermanagement.submit.success' }),
        });
      })();
    }
  }, [result]);
  return handleSaveCustomization;
};
