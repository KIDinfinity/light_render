import { produce } from 'immer';
import moment from 'moment';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

const claimEstimateTreatmentUpdate = (state: any, { payload }: any) => {
  const { changedFields, id } = payload;

  const nextState = produce(state, (draftState: any) => {
    let extra = {};

    const item =
      lodash.find(
        draftState.businessData.nonSupportClaimEstimation.nonSupportIncident
          .nonSupportTreatmentList,
        {
          id,
        }
      ) || {};

    const finishItem = {
      ...item,
      ...changedFields,
    };

    if (lodash.size(changedFields) === 1) {
      if (
        lodash.has(changedFields, 'dateOfAdmission') ||
        lodash.has(changedFields, 'dateOfDischarge')
      ) {
        const dateOfAdmission = formUtils.queryValue(finishItem.dateOfAdmission);
        const dateOfDischarge = formUtils.queryValue(finishItem.dateOfDischarge);
        extra = {
          ...extra,
          inpatientDays:
            !!dateOfAdmission && !!dateOfDischarge
              ? moment(dateOfDischarge)
                  .startOf('day')
                  .diff(moment(dateOfAdmission).startOf('day'), 'days') + 1
              : '',
        };
      }
    }

    draftState.businessData.nonSupportClaimEstimation.nonSupportIncident.nonSupportTreatmentList =
      lodash.map(
        draftState.businessData.nonSupportClaimEstimation.nonSupportIncident
          .nonSupportTreatmentList,
        (item: any) => {
          if (item.id === id) {
            return {
              ...item,
              ...changedFields,
              ...extra,
            };
          }
          return item;
        }
      );
  });

  return { ...nextState };
};

export default claimEstimateTreatmentUpdate;
