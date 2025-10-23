import lodash from 'lodash';
import { getAuth } from '@/auth/Utils';
import { ESelfAuthCode } from 'bpm/pages/Envoy/enum';

interface IAction {
  payload: any[];
}

const envoyAuthCodeArr = lodash.values(ESelfAuthCode);

export default function* ({ payload }: IAction, { put, select }: any) {
  const commonAuthorityList = yield select(
    (state: any) => state.authController.commonAuthorityList
  );

  const envoyAuth = {};
  for (let authIdx = 0, authLen = envoyAuthCodeArr?.length; authIdx < authLen; authIdx += 1) {
    const authorityCode = envoyAuthCodeArr[authIdx];
    envoyAuth[authorityCode] = getAuth(commonAuthorityList, {
      authorityCode,
      limitType: 'actiPend',
      ...payload,
    });
  }

  // 没有taskId怎么办,?  默认都可以调
  return envoyAuth;
}
