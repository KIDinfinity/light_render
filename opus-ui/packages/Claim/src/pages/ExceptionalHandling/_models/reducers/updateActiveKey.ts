import { produce } from 'immer';

const updateActiveKey = (state: any, action: any) => {
  const { activeKey } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.activeKey = activeKey;
  });

  return { ...nextState };
};

export default updateActiveKey;
