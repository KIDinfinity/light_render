import { update } from '@/services/posControllerService';

export default function* ({ payload }: any, { call, put }: any) {
  const { caseNo, transactionType, caseCategory } = payload;
  const response = yield call(update, {
    caseNo,
    transactionType,
    caseCategory,
  });
}
