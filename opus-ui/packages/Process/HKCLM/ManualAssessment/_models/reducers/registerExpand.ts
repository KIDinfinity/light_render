import { produce } from 'immer';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { incidentId, setSwitchOn, setInvoiceExpand, setProcedureExpand } = payload;

    draftState.expandList = [
      ...(draftState.expandList?.expandList || []),
      {
        incidentId,
        setSwitchOn,
        setInvoiceExpand,
        setProcedureExpand,
      },
    ];
  });
