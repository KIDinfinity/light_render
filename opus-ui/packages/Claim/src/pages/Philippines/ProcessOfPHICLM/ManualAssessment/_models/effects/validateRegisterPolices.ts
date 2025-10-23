import lodash from 'lodash';
import { handleMessageModal } from '@/utils/commonMessage';
import { VLD_000366, VLD_000369 } from 'claim/pages/validators/sectionValidators';
export default function* validateRegister(_: any, { select, call }: any) {
  const { claimPayableListMap } = yield select((state: any) => ({
    claimPayableListMap:
      state?.PHCLMOfClaimAssessmentController?.claimEntities?.claimPayableListMap,
  }));

  const validators = lodash.compact([
    VLD_000366(claimPayableListMap),
    VLD_000369(claimPayableListMap),
  ]);
  if (lodash.size(validators) > 0) {
    handleMessageModal(validators);
    return false;
  }
  return true;
}
