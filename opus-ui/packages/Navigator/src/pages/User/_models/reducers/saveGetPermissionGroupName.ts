/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, { payload: { list, dictList } }: any) =>
  produce(state, (draftState: any) => {
    draftState.groupList = lodash.map(lodash.compact(list), (item) => ({
      ...item,
      formatName: lodash.find(dictList, (dict) => dict?.dictCode === item?.groupCode)?.dictName,
    }));
  });
