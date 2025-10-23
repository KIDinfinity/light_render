import { produce } from 'immer';
import lodash from 'lodash';
import { getApplicationDate, documentUtils, setExtraForm } from '../../Utils';
import checkValidators from './checkValidators';

export default (state: any, action: any) => {
  const { applicationNo, documentId, changedFields } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const newFormData = {
      ...draftState.claimProcessData.claimEntities.bpoFormDataList[documentId].formData,
      ...changedFields,
    };
    // eslint-disable-next-line no-param-reassign
    draftState.claimProcessData.claimEntities.bpoFormDataList[documentId].formData = {
      ...newFormData,
      ...documentUtils.getFormArrivalDate({ formData: newFormData, documentId }),
      ...setExtraForm(newFormData, changedFields),
    };
    if (applicationNo && !action.isValidating) {
      // eslint-disable-next-line no-param-reassign
      draftState.claimProcessData.claimEntities.claimApplicationDocList[applicationNo] = {
        ...draftState.claimProcessData.claimEntities.claimApplicationDocList[applicationNo],
        ...getApplicationDate({
          applicationNo,
          documentList:
            (lodash.chain(draftState.applicationList) as any)
              .find({ applicationNo })
              .get('documentList')
              .value() || [],
          bpoFormDataList: draftState.claimProcessData.claimEntities.bpoFormDataList,
        }),
      };
    }
  });
  return checkValidators(nextState, {
    type: 'checkValidators',
    payload: action.payload,
  });
};
