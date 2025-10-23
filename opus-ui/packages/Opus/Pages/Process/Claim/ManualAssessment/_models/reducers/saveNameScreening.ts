import lodash from 'lodash';

const saveNameScreening = (state: any, { payload }: any) => {
  return {
    ...state,
    claimProcessData: {
      ...state.claimProcessData,
      claimAmlNameScreeningDOList: lodash.isArray(payload) ? payload : [],
    },
  };
};

export default saveNameScreening;
