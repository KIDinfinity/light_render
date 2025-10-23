import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';

import { denormalizeClaimData } from '@/utils/claimUtils';
import { formUtils } from 'basic/components/Form';

export default function* (action, { select, put }: any) {
  const clearData = action?.payload?.clearData;

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

  if(clearData && claimData.claimPayableList?.length && claimProcessData.appeal) {
    const claimPayableList = claimData.claimPayableList
    const json = JSON.stringify(claimPayableList)
    yield put({
      type: 'updateAdjustClaimPayableList',
      payload: json,
    })
    lodash.set(claimData, 'claimAppealOriginalCase.adjustClaimPayableList', json)
    // lifePayable比较特殊，如果lifePayable的payableAmount是null，那么它的上一层就一定是null，所以不会有影响
    const subList = ['treatmentPayableList', 'invoicePayableList', 'serviceItemPayableList', 'accidentBenefitPayableList'];
    const isLegit = num => num || num === 0;
    const newPayableList = lodash.cloneDeep(claimPayableList.filter(claimPayable => claimPayable.isNewPayable || (claimPayable.isPayableAdjusted && isLegit(claimPayable.payableAmount))));
    const clearEmptyPayable = payable => {
      subList.map(field => {
        if(payable?.[field]) {
          payable[field] = payable[field]?.filter(subPayable => {
            return isLegit(subPayable.payableAmount);
          })
          payable[field]?.map(clearEmptyPayable)
        }
      })
    }
    clearEmptyPayable(newPayableList.filter(payable => payable.isPayableAdjusted));
    claimData.claimPayableList = newPayableList;
  }

  lodash.set(claimData, 'taskNotEditable', taskNotEditable);
  if (claimData?.expectDecisionList) delete claimData.expectDecisionList;
  return claimData;
}
