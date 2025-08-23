import { produce }  from 'immer';
import lodash from 'lodash';

const saveConfigList = (state: any, action: any) => {
  const { list } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.configObj = {
      domainList: lodash.reduce(
        list,
        (arr: [], item: any) => {
          item.domain &&
            !lodash.isEmpty(item?.domain) &&
            !arr.includes(item?.domain) &&
            arr.push(item?.domain);
          return arr;
        },
        []
      ),
      configList: list,
    };
  });

  return { ...nextState };
};

export default saveConfigList;
