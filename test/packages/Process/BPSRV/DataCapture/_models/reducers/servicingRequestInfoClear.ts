/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { id } = payload;
    delete draftState.sortApplyListMap[id];
    lodash.keys(draftState.entities.policyInfoBOListMap).forEach((mapId: any) => {
      if (mapId.includes(id)) {
        delete draftState.entities.policyInfoBOListMap[mapId];
      }
    });
  });
