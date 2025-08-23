/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default (state: any, action: any) =>
  produce(state, (draftState: any) => {
    const { changedFields, incidentId } = action.payload;
    const finalChangedFields = { ...changedFields };

    if (lodash.size(changedFields) === 1) {
      const claimTypeArray = formUtils.queryValue(changedFields.claimTypeArray);
      if (lodash.has(changedFields, 'claimTypeArray')) {
        if (lodash.isString(claimTypeArray)) {
          finalChangedFields.claimTypeArray = {
            ...finalChangedFields.claimTypeArray,
            value: claimTypeArray.split(','),
          };

          if (
            lodash.size(claimTypeArray.split(',')) === 1 &&
            ['OP', 'IP'].includes(claimTypeArray)
          ) {
            lodash
              .filter(
                draftState.claimEntities.treatmentListMap,
                (item: any) => incidentId === item.incidentId
              )
              .forEach((item: any) => {
                draftState.claimEntities.treatmentListMap[item.id].treatmentType = claimTypeArray;
              });
          }
        }
      }
    }

    if (
      changedFields?.trafficAccidentFlag &&
      formUtils.queryValue(changedFields?.trafficAccidentFlag) === 'N'
    ) {
      draftState.claimEntities.incidentListMap[incidentId].isDrinking = 'N';
    }

    draftState.claimEntities.incidentListMap[incidentId] = {
      ...draftState.claimEntities.incidentListMap[incidentId],
      ...finalChangedFields,
    };
  });
