import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, { payload: { permissionCommonResource, dictList } }: any) => {
  return produce(state, (draftState: any) => {
    draftState.commonList = lodash.map(permissionCommonResource, (item) => ({
      ...item,
      formatName:
        lodash.some(dictList, (dict) => dict?.dictCode === item?.value) === true
          ? lodash.find(dictList, (dict) => dict?.dictCode === item?.value)?.dictName
          : item?.name,
    }));
  });
};
