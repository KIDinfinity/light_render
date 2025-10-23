import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';

import { denormalizeClaimData } from '@/utils/claimUtils';
import { formUtils } from 'basic/components/Form';

export default function* (_, { select }: any) {
  const claimProcessData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData
  );
  const claimEntities = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities
  );

  const taskNotEditable: any = yield select(
    ({ claimEditable }: any) => claimEditable.taskNotEditable
  );

  const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);
  const claimData: any = formUtils.formatFlattenValue(
    formUtils.cleanValidateData(denormalizedData)
  );
  if (lodash.isEmpty(claimData)) return {};

  lodash.set(claimData, 'taskNotEditable', taskNotEditable);
  if (claimData?.expectDecisionList) delete claimData.expectDecisionList;

  return claimData;
}
