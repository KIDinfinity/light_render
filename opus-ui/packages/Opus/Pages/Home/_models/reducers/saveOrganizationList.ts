import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { organizationList } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.organizationList = organizationList;
    const isMember = Array.isArray(organizationList) && organizationList.length === 0;
    draftState.headerTabList = lodash.filter(draftState.headerTabList, (item: any) =>
      isMember ? item.isMember : true
    );
    draftState.isMember = isMember;
  });
  return { ...nextState };
};
