import { produce }  from 'immer';
import {v4 as uuidv4 } from 'uuid';

const addResult = (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.editData = {
      ...draftState.editData,
      results: [
        ...draftState.editData.results,
        {
          id: uuidv4(),
          binded: '0',
        },
      ],
    };
  });

  return { ...nextState };
};

export default addResult;
