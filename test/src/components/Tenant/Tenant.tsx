import { useEffect } from 'react';
import { useSelector, useDispatch } from 'dva';
import prepare from './prepare';
import { ENG, HK, JP, PH, TH } from './region';

const Tenant = ({ setReady }: any) => {
  const dispatch = useDispatch();

  const userId = useSelector(({ user }: any) => user.currentUser?.userId);

  useEffect(() => {
    prepare()?.then(() => setReady(true));
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch({
        type: 'customization/loadCustomization',
      });
    }
  }, [userId]);

  return null;
};

Tenant.ENG = ENG;
Tenant.HK = HK;
Tenant.JP = JP;
Tenant.PH = PH;
Tenant.TH = TH;

export default Tenant;
