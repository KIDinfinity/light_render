import { produce } from 'immer';

const saveCommonAuthorityList = (state: any, action: any) => {
  const { commonAuthorityList, authorityCodeList } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.commonAuthorityList = commonAuthorityList;
    if (authorityCodeList) {
      draftState.authorityCodeList = authorityCodeList;
    }
  });
  return { ...nextState };
};

export default saveCommonAuthorityList;
