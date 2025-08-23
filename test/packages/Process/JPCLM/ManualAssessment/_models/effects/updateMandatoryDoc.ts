import claimMandatoryDocControllerService from '@/services/claimMandatoryDocControllerService';

export default function* updateMandatoryDoc({ payload }: any, { call }: any) {
  const response = yield call(claimMandatoryDocControllerService.updateMandatoryDoc, payload);
  if (response?.success) {
    return true;
  }
  return false;
}
