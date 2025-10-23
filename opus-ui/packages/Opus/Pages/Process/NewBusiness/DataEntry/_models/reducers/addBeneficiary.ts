import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';
import { v4 as uuidv4 } from 'uuid';

export default (state) => {
  return produce(state, draftState => {
    if(!draftState.processData.beneficiaries)
      draftState.processData.beneficiaries = [];
    draftState.processData.beneficiaries.push({
      id: uuidv4()
    })
  })
}