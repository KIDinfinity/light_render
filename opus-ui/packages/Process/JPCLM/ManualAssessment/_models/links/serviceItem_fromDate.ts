import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default ({ draftState, changedFields, serviceItemId }: any) => {
  if (!lodash.has(changedFields, 'fromDate')) return;
  const draft = draftState;

  const target = formUtils.queryValue(draft.claimEntities.serviceItemListMap[serviceItemId]?.toDate);
  if (!target) {
    draft.claimEntities.serviceItemListMap[serviceItemId].toDate = changedFields.fromDate.value;
  }
};
