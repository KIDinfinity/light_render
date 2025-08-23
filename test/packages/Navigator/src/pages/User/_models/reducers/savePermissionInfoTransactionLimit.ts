import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, { payload: { permissionTransactionLimit, dictList } }: any) =>
  produce(state, (draftState: any) => {
    draftState.permissionTransactionLimit = lodash.map(permissionTransactionLimit, (item) => ({
      ...item,
      displayDescription: lodash.find(dictList, (dict) => dict?.dictCode === 'MaxMessage')
        ?.dictName,
      limitCodeName: lodash.find(dictList, (dict) => dict?.dictCode === `${item?.limitCode}Name`)
        ?.dictName,
      limitCodeValue: lodash.find(dictList, (dict) => dict?.dictCode === `${item?.limitCode}Value`)
        ?.dictName,
      limitCodeLimit: lodash.find(dictList, (dict) => dict?.dictCode === `${item?.limitCode}Limit`)
        ?.dictName,
    }));
  });
