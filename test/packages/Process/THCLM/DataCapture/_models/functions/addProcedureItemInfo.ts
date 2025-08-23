import {v4 as uuidv4 } from 'uuid';
import { NAMESPACE } from '../../activity.config';

export function addProcedureItemInfo(dispatch: any, treatmentId: any, changedValues: any) {
  const procedureId = uuidv4();
  dispatch({
    type: `${NAMESPACE}/addProcedureItem`,
    payload: {
      treatmentId,
      procedureId,
      changedValues,
    },
  });
}

export default addProcedureItemInfo;
