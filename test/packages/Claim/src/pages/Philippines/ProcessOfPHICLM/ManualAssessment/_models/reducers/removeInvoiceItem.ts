import { produce } from 'immer';
import lodash from 'lodash';

const removeInvoiceItem = (state: any, action: any) => {
  const { treatmentId, invoiceId } = action.payload;

  const nextState = produce(state, (draft: any) => {
    const draftState = draft;
    const serviceIdList = draftState.claimEntities.invoiceListMap[invoiceId].serviceItemList;
    draftState.claimEntities.treatmentListMap[treatmentId].invoiceList = lodash.filter(
      draftState.claimEntities.treatmentListMap[treatmentId].invoiceList,
      (itemId) => itemId !== invoiceId
    );
    const targetArray = lodash
      .chain(draftState?.claimEntities?.invoicePayableListMap)
      .map((item) =>
        item?.invoiceId === invoiceId
          ? {
              id: item?.id,
              benefitItemPayableList: item?.benefitItemPayableList,
              treatmentPayableId: item?.treatmentPayableId,
            }
          : ''
      )
      .compact()
      .value();

    lodash.forEach(targetArray, (item) => {
      draftState.claimEntities.treatmentPayableListMap[
        item?.treatmentPayableId
      ].invoicePayableList = lodash.filter(
        draftState.claimEntities.treatmentPayableListMap[item?.treatmentPayableId]
          .invoicePayableList,
        (itemId) => itemId !== item?.id
      );
      delete draftState.claimEntities.invoicePayableListMap[item?.id];
      lodash.forEach(
        item?.benefitItemPayableList,
        (benefitId) => delete draftState.claimEntities.benefitItemPayableListMap[benefitId]
      );
    });

    delete draftState.claimEntities.invoiceListMap[invoiceId];
    lodash.map(serviceIdList, (itemId) => {
      delete draftState.claimEntities.serviceItemListMap[itemId];
    });
  });

  return { ...nextState };
};

export default removeInvoiceItem;
