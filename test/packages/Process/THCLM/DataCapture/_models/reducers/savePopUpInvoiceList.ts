import { produce }  from 'immer';
import lodash from 'lodash';
import { buildEmptyInvoice, buildEmptyServiceItem } from '../functions/handlePopUp';

export default (state: any, action: any) => {
  const { popUpInvoiceIdList } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const claimNo = draftState.claimProcessData?.claimNo;
    const newInvoiceItem = buildEmptyInvoice({ claimNo });
    if (lodash.isEmpty(popUpInvoiceIdList)) {
      draftState.popUpInvoiceList = [newInvoiceItem];
      draftState.popUpAddInvoiceItem = {};
    } else {
      const newInvoiceList = lodash.map(popUpInvoiceIdList, (id: any) => {
        const newServiceItem = buildEmptyServiceItem({ claimNo, invoiceId: id });
        const { serviceItemList, treatmentId } = lodash.pick(
          draftState.claimEntities?.invoiceListMap[id],
          ['serviceItemList', 'treatmentId']
        );
        const treatmentNo = draftState.claimEntities?.treatmentListMap[treatmentId]?.treatmentNo;

        const serviceList = lodash.map(
          serviceItemList,
          (serviceId) => draftState.claimEntities?.serviceItemListMap[serviceId]
        );

        return {
          ...draftState.claimEntities?.invoiceListMap[id],
          treatmentNo: treatmentNo || 1,
          serviceItemList: lodash.isEmpty(serviceList) ? [newServiceItem] : serviceList,
          serviceAddItem: lodash.isEmpty(serviceList) ? {} : newServiceItem,
        };
      });
      draftState.popUpInvoiceList = newInvoiceList;
      draftState.popUpAddInvoiceItem = newInvoiceItem;
    }
  });
  return { ...nextState };
};
