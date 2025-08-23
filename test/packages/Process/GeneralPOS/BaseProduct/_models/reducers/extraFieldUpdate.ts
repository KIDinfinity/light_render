/* eslint-disable no-param-reassign */
import { produce }  from 'immer';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { section, changedFields } = payload;
    if (!draftState.extraField[section]) {
      draftState.extraField[section] = {};
    }
    draftState.extraField[section] = {
      ...draftState.extraField[section],
      ...changedFields,
    };
  });
