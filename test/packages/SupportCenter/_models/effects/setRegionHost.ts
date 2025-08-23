import CryptoJS from 'crypto-js';
import lodash from 'lodash';
import { isDevEnv, passKey } from '../funtions';
import { history } from 'umi';

export default function* setRegionHost({ payload }: any, { select }: any) {
  const { region, username, password } = payload;

  const regionList = yield select(
    ({ supportCenterController }: any) => supportCenterController?.switchRegionList
  );
  if (lodash.isNil(region) || lodash.isNil(username)) return;

  const envItem = regionList?.find((i: { region: any }) => i?.region === region);
  const obj = { password, username };
  const key = encodeURIComponent(CryptoJS.AES.encrypt(JSON.stringify(obj), passKey).toString());

  const path = isDevEnv() ? '' : envItem?.host;

  history.push(`${path}/supportCenter/user/login?key=${key}&silent=true`);
}
