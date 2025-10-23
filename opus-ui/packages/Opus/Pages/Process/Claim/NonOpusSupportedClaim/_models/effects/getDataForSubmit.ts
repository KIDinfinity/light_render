import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'opus/Pages/Process/Claim/NonOpusSupportedClaim/activity.config';

export default function* (_: any, { select }: any) {
  const { businessData } = yield select((state: any) => state[NAMESPACE]);

  const claimData = formUtils.formatFlattenValue(formUtils.cleanValidateData(businessData));
  if (lodash.isEmpty(claimData)) return {};
  return {
    ...claimData,
    refundAmount: businessData?.refundAmount || {},
  };
}
