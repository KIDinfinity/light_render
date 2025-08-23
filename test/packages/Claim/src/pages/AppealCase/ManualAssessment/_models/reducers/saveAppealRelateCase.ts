import lodash from 'lodash';

const saveAppealRelateCase = (state: any, { payload }: any) => {
  return {
    ...state,
    appealRelateCase: lodash.isArray(payload) ? payload : [],
  };
};

export default saveAppealRelateCase;
