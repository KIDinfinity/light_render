import { findByUserId as getUserByUserId } from '@/services/userCenterUserPersonalInfoControllerService';

export default function* findByUserId({ payload }: any, { call }: any) {
  const response = yield call(getUserByUserId, {
    ...payload,
  });
  return response;
}
