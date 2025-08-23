import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { incidentId, invoiceExpand, procedureExpand } = payload;

    lodash.forEach(draftState?.expandList, (item: any) => {
      if (incidentId === item?.incidentId && lodash.isFunction(item?.setSwitchOn)) {
        item.setSwitchOn(true);
        if (invoiceExpand && lodash.isFunction(item.setInvoiceExpand)) {
          item.setInvoiceExpand(true);
        }
        if (procedureExpand && lodash.isFunction(item.setProcedureExpand)) {
          item.setProcedureExpand(true);
        }
      }
    });
  });
