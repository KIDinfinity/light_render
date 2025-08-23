import lodash from 'lodash';
import { produce }  from 'immer';

export default (state: any, action: any) => {
  const { id, data, section } = lodash.pick(action?.payload, ['id', 'data', 'section']);
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, `clientsData.${id}.${section}`, data);
  });
  return {
    ...nextState,
  };
};
