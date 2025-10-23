import CryptoJS from 'crypto-js';
import { isDevEnv, passKey } from '../funtions';
import { history } from 'umi';
import { switchRegionWithLogin } from '@/services/supportCenterControllerService';
import { tenant } from '@/components/Tenant';

export default function* getNewRegionHost({ payload }: any, { call }: any) {
  const { region, userId, host } = payload;
  const currentRegion = tenant.region();

  const res = yield call(
    switchRegionWithLogin,
    { userId, region },
    {
      headers: {
        ['X-Tenant']: currentRegion.toLowerCase(),
        ['X-Region']: currentRegion.toUpperCase(),
      },
    }
  );
  if (!res || res.error) return;
  const encryption = passKey;
  const paramObj = { encryptedKey: res?.responseData?.resultData?.encryptedPassword, userId };
  let key = CryptoJS.AES.encrypt(JSON.stringify(paramObj), encryption).toString();
  key = encodeURIComponent(key);

  if (!isDevEnv()) {
    history.push(`${host}/supportCenter/user/login?passkey=${key}&silent=true`);
  } else {
    history.push(`/supportCenter/user/login?passkey=${key}&silent=true`);
  }
}
