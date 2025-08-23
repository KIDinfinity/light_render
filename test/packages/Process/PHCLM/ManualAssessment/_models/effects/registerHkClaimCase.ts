import claimHkClaimRegisterControllerService from '@/services/claimHkClaimRegisterControllerService';

export default function* registerHkClaimCase({ payload }: any, { call }: any) {

  const response = yield call(claimHkClaimRegisterControllerService.registerHkClaimCase, payload);

  return response;
}
