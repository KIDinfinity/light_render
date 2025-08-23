import { produce } from 'immer';
import lodash from 'lodash';

const saveInvoiceInforData = (state: any, { payload }: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.claimProcessData = {
      ...(draftState?.claimProcessData || []),
      invoiceInforData: lodash.get(payload, 'invoiceInforData', {}),
    };
  });
  return { ...nextState };
};

export default saveInvoiceInforData;
