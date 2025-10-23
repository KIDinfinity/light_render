import { produce } from 'immer';
import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';

export default (state: any, action: any) => {
  const { coverageId } = lodash.pick(action?.payload, ['coverageId']);
  const id = uuidv4();
  const nextState = produce(state, (draftState: any) => {
    const newRow = {
      id,
      insuredSeqNum: '',
    };
    const coverageList = lodash.get(draftState, 'modalData.processData.coverageList');
    const index = lodash.findIndex(coverageList, (item: any) => item?.id === coverageId);
    const coverageInsuredList =
      lodash
        .chain(coverageList)
        .find((item) => item?.id === coverageId)
        .get('coverageInsuredList')
        .value() || [];
    lodash.set(draftState, `modalData.processData.coverageList.[${index}].coverageInsuredList`, [
      ...coverageInsuredList,
      newRow,
    ]);
  });
  return {
    ...nextState,
  };
};
