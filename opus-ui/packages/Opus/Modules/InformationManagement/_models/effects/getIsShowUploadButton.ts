import { isShowUploadButton, isShowUploadButtonClaim } from '@/services/owbNbControllerService';
import { BusinessCode } from 'claim/enum/BusinessCode';
import type { IEffects } from '../interfaces/index';

const apiMap = {
  [BusinessCode.claim]: isShowUploadButtonClaim,
  [BusinessCode.nb]: isShowUploadButton,
};

export default function* ({ payload }: any, { call, put }: IEffects) {
  const caseNo = payload?.caseNo;
  const businessCode = payload?.businessCode;

  const api = apiMap[businessCode];
  if (!api) return;

  const result = yield call(api, { caseNo });

  yield put({
    type: 'setIsShowUploadButton',
    payload: result?.resultData || false,
  });
}
