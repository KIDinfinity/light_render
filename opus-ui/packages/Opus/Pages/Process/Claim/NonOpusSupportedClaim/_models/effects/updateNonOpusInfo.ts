import claimNonOpusControllerService from '@/services/claimNonOpusControllerService';

export default function* updateNonOpusInfo({ payload }: any, { call, put, select }: any) {
  yield call(claimNonOpusControllerService.updateNonOpusInfo, payload);
}
