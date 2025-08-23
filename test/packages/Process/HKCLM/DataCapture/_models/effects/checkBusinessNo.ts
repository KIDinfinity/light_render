import { duplicateCheck } from '@/services/claimCaseControllerV3Service';
import { NAMESPACE } from '../../../ClaimRegister/activity.config';


export default function* checkBusinessNo(payload, { select, call, put }) {
  const data = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace
  );
  const taskDetail = yield select(
    (state) => state.processTask?.getTask
  );
  const { inquiryBusinessNo, businessNo } = taskDetail
  const { inquiryClaimNo } = data.claimProcessData;

  if(inquiryClaimNo) {
    yield call(duplicateCheck, {
      inquiryBusinessNo: inquiryClaimNo?.value || inquiryClaimNo,
      businessNo
    })
  }
}
