import { produce }  from 'immer';
import lodash from 'lodash';
import { buildEmptyInvoice } from '../functions/handlePopUp';

const removePopUpInvoice = (state: any, action: any) => {
  const { invoiceId } = action.payload;

  const nextState = produce(state, (draftState) => {
    const claimNo = draftState.claimProcessData?.claimNo;
    const newInvoiceItem = buildEmptyInvoice({ claimNo });
    const newProcedureList = lodash.filter(
      draftState.popUpInvoiceList,
      (item) => item.id !== invoiceId
    );
    draftState.popUpInvoiceList = lodash.isEmpty(newProcedureList)
      ? [newInvoiceItem] || []
      : newProcedureList;
    draftState.popUpAddInvoiceItem = lodash.isEmpty(newProcedureList)
      ? {}
      : draftState.popUpAddInvoiceItem;
  });

  return { ...nextState };
};

export default removePopUpInvoice;
