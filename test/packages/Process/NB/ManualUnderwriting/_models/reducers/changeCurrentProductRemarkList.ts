import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const coverageRemarkList = lodash.get(action, 'payload.coverageRemarkList', []);
  const id = lodash.get(action, 'payload.id', undefined);
  const nextState = produce(state, (draftState: any) => {
    const path = 'businessData.policyList[0].coverageList';
    const cIndex = lodash
      .chain(draftState)
      .get(path)
      .findIndex((item: any) => item?.id === id)
      .value();
    const newDraft = lodash
      .chain(draftState)
      .cloneDeep()
      .set(`${path}.[${cIndex}].coverageRemarkList`, coverageRemarkList)
      .value();
    return newDraft;
  });
  return { ...nextState };
};
