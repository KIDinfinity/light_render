import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { denormalizeClaimData } from 'process/NewBusiness/ManualUnderwriting/_utils/normalizrUtils';

export default function* (_, { select, put }: any): Generator<any, any, any> {
  const processData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData
  ) || {};
  const entities = yield select(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.entities);
  const denormalizedData = denormalizeClaimData(processData, entities);

  return denormalizedData;
}
