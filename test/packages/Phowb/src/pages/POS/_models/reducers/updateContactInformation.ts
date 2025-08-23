import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import getData from '../../Utils/getData';

const updateContactInformation = (state: any, action: any) => {
  const { changedFields } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const newData = {
      ...draftState.claimProcessData.posDataDetail.changeContactInformation,
      ...changedFields,
    };
    const nextObject = lodash.omit(
      lodash.cloneDeep(draftState.claimProcessData.originalSectionData.changeContactInformation),
      ['applyTo']
    );
    const object = lodash.omit(lodash.cloneDeep(newData), ['applyTo']);
    const isApplyToRequired = !lodash.isEqual(
      getData(nextObject),
      getData(formUtils.cleanValidateData(object))
    );
    const extraData =
      !isApplyToRequired &&
      draftState.claimProcessData.posDataDetail.changeContactInformation?.applyTo?.errors?.length
        ? {
            applyTo: {
              ...newData?.applyTo,
              errors: null,
            },
          }
        : {};
    // eslint-disable-next-line no-param-reassign
    draftState.claimProcessData.posDataDetail.changeContactInformation = {
      ...newData,
      ...extraData,
    };
  });

  return { ...nextState };
};

export default updateContactInformation;
