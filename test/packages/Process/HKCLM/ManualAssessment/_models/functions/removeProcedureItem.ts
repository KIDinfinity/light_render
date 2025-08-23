import { NAMESPACE } from '../../activity.config';

export function removeProcedureItem(dispatch: any, treatmentId: any, procedureId: any) {
  dispatch({
    type: `${NAMESPACE}/removeProcedureItem`,
    payload: {
      treatmentId,
      procedureId,
    },
  });
}

export default removeProcedureItem;
