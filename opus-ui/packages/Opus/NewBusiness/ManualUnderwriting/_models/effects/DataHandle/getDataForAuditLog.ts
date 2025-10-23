import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { denormalizeClaimData } from 'opus/NewBusiness/ManualUnderwriting/_utils/normalizrUtils';
import { formUtils } from 'basic/components/Form';

export default function* (_, { select, put }: any): Generator<any, any, any> {
  const processData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData
  ) || {};
  const entities = yield select(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.entities);
  const denormalizedData = denormalizeClaimData(processData, entities);
  const claimData = formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData));
  return claimData;
}
