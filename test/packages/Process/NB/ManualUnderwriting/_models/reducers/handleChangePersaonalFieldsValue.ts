import lodash from 'lodash';
import { produce }  from 'immer';
import { formUtils } from 'basic/components/Form';
import moment from 'moment';
import changeBasicInfoFieldsValue from './changeBasicInfoFieldsValue';
import changePersaonalFieldsCoreLogic from 'process/NB/ManualUnderwriting/utils/fieldsChange/changePersaonalFieldsCoreLogic';

export default (state: any, action: any) => {
  const { changedFields, id } = action.payload;
  let nextState: any = changeBasicInfoFieldsValue(state, action);
  if (lodash.size(changedFields) === 1) {
    if (lodash.has(changedFields, 'dateOfBirth')) {
      const effectiveDate = formUtils.queryValue(
        lodash.get(nextState, 'businessDataValue.policyList[0].effectiveDate')
      );
      const dateOfBirth = formUtils.queryValue(lodash.get(changedFields, 'dateOfBirth'));
      const reg = /^[0-9]{4,4}-[0-9]{2,2}-[0-9]{2,2}/;
      if (reg.test(effectiveDate) && reg.test(dateOfBirth)) {
        const customerAge = moment(effectiveDate).diff(moment(dateOfBirth), 'years');
        if (lodash.isNumber(customerAge)) {
          nextState = changeBasicInfoFieldsValue(nextState, {
            payload: {
              id,
              changedFields: {
                customerAge,
              },
            },
          });
        }
      }
    }
    const businessData = changePersaonalFieldsCoreLogic({
      businessData: nextState.businessDataValue,
      changedFields,
      id,
    });
    nextState = produce(nextState, (draftState: any) => {
      lodash.set(draftState, 'businessDataValue', businessData);
    });
  }
  return {
    ...nextState,
  };
};
