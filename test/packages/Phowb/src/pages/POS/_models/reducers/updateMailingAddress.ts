import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

const updateMailingAddress = (state: any, action: any) => {
  const { changedFields, InitChangePreferredMailingAddress } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    if (InitChangePreferredMailingAddress&&changedFields.city) {
      changedFields.zipCode = InitChangePreferredMailingAddress.zipCode;
    }
    if (changedFields&&changedFields.country) {
      changedFields.country = changedFields?.country?.locale_new||changedFields.country;
    }
    const newData = {
      ...draftState.claimProcessData.posDataDetail.changePreferredMailingAddress,
      ...changedFields,
    };
    const nextObject = lodash.omit(
      lodash.cloneDeep(
        draftState.claimProcessData.originalSectionData.changePreferredMailingAddress
      ),
      ['applyTo']
    );
    const object = lodash.omit(lodash.cloneDeep(newData), ['applyTo']);
    const isApplyToRequired = !lodash.isEqual(nextObject, formUtils.cleanValidateData(object));
    const extraData =
      !isApplyToRequired &&
      draftState.claimProcessData.posDataDetail.changePreferredMailingAddress?.applyTo?.errors
        ?.length
        ? {
            applyTo: {
              ...newData?.applyTo,
              errors: null,
            },
          }
        : {};
    // eslint-disable-next-line no-param-reassign
    draftState.claimProcessData.posDataDetail.changePreferredMailingAddress = {
      ...newData,
      ...extraData,
    };
  });

  return { ...nextState };
};

export default updateMailingAddress;
