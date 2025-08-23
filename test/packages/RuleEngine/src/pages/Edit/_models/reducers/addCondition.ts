import { produce }  from 'immer';
import {v4 as uuidv4 } from 'uuid';

const addCondition = (state: any,) => {
  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.editData = {
      ...draftState.editData,
      conditions: [
        ...draftState.editData.conditions,
        {
          id: uuidv4(),
        },
      ],
    };
  });

  return { ...nextState };
};

export default addCondition;
