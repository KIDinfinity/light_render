import lodash from 'lodash';
import { denormalizeClaimData } from '@/utils/claimUtils';
import { formUtils } from 'basic/components/Form';

export default function* (_, { select }) {
  const { claimProcessData, claimEntities } = yield select(
    (state) => state.PHCLMOfAppealCaseController
  );
  const { claimAppealInfo, selectedCase } = yield select((state) => state.MaAppealCaseController);
  const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);
  const claimData: any = formUtils.formatFlattenValue(
    formUtils.cleanValidateData(denormalizedData)
  );

  claimData.claimAppealInfo = formUtils.formatFlattenValue(
    formUtils.cleanValidateData(claimAppealInfo)
  );
  claimData.selectedCase = selectedCase;
  if (lodash.isEmpty(claimData)) {
    return false;
  }
  return claimData;
}
