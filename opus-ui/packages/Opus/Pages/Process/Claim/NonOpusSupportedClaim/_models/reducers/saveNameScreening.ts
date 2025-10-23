import lodash from 'lodash';

const saveNameScreening = (state: any, { payload }: any) => {
  return {
    ...state,
    businessData: {
      ...state.businessData,
      claimAmlNameScreeningDOList: lodash.isArray(payload) ? payload : [],
    },
  };
};

export default saveNameScreening;
