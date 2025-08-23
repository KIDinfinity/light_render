import { useEffect } from 'react';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import { SS, SSKey } from '@/utils/cache';

const AuthLayout = ({ setReady }: any) => {
  const dispatch = useDispatch();

  const userId = useSelector(({ user }: any) => user.currentUser?.userId);

  useEffect(() => {
    const t = async () => {
      await Promise.all([
        dispatch({
          type: 'authController/getCommonAuthorityList',
        }),
        dispatch({
          type: 'checkRBAC/checkRBAC',
          payload: {
            resourceCode: 'RS_CreateCase_enter', // Smart Circle 的Resource Id
            userId,
          },
        }),
      ]);

      setReady(true);

      const list = await dispatch({
        type: 'dictionaryController/findDictionaryByTypeCode',
        payload: objectToFormData({ typeCode: 'contact' }),
      });
      SS.setItem(SSKey.SUPPORTEMail, lodash.get(list, '[0].dictName'));
    };

    t();
  }, []);

  return null;
};

export default AuthLayout;
