import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';

export default (state, action) => {
  const { changedFields, id } = action?.payload || {};
  return produce(state, draftState => {
    const beneficiary = draftState.processData.beneficiaries?.find(item => item.id === id);
    // 032 代表 Cooperative
    if(formUtils.queryValue(changedFields?.beneficiaryRelationship) === '032') {
      beneficiary.beneficiaryproportion = 90;
    }
    formUtils.saveChangedFields({ baseObject: beneficiary, changedFields });
  })
}