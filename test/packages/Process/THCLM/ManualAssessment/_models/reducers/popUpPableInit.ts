/* eslint-disable no-param-reassign */

/**
 * PopUpPable - 初始化
 */
import { produce }  from 'immer';
import lodash from 'lodash';

const popUpPableInit = (state: any, { payload }: any) => {
  const { serviceItemId, incidentId, treatmentId, extra = {} } = payload;

  const nextState = produce(state, (draftState: any) => {
    const newTreatmentId =
      treatmentId ||
      lodash
        .chain(draftState.claimEntities.treatmentListMap)
        .values()
        .filter({ incidentId })
        .reduce((obj: any, item: any) => {
          return lodash.isEmpty(obj) || Number(obj.treatmentNo) - Number(item.treatmentNo) > 0
            ? item
            : obj;
        }, {})
        .get('id')
        .value();

    draftState.popUpPayable = {
      basic: {
        incidentId,
        treatmentId: newTreatmentId,
        claimDecision: 'A',
        policyNo: '',
        benefitTypeCode: '',
        ...extra,
      },

      service: lodash
        .chain(draftState?.claimEntities?.serviceItemListMap)
        .values()
        .reduce((data, item) => {
          return newTreatmentId ===
            draftState.claimEntities.invoiceListMap[item.invoiceId].treatmentId || !treatmentId
            ? {
                ...data,
                [item.id]: {
                  ...(draftState.claimEntities.serviceItemListMap?.[item.id] || {}),
                  id: item.id,
                  serviceItemId: item?.id,
                  invoiceId: item.invoiceId,
                  invoiceNo: draftState.claimEntities.invoiceListMap[item.invoiceId]?.invoiceNo,
                  chooise: !!(serviceItemId && serviceItemId === item.id),
                  treatmentNo: draftState.claimEntities.treatmentListMap[newTreatmentId].orderNum,
                  treatmentId: newTreatmentId,
                },
              }
            : { ...data };
        }, {})
        .value(),
      benefitListMap: {},
    };
    draftState.isShowPopUpPayable = true;
  });

  return { ...nextState };
};

export default popUpPableInit;
