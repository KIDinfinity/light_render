import lodash from 'lodash';

const saveRequestClientInfoList = (state: any, { payload }: any) => {
  return {
    ...state,
    requestClientInfoList: lodash.get(payload, 'requestClientInfoList'),
  };
};

export default saveRequestClientInfoList;
