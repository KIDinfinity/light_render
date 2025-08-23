import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, { payload = {} }: any) => {
  const { datas } = payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.customerIdentification = {
      ...draftState.customerIdentification,
      show: !lodash.isEmpty(datas),
      datas,
    };
  });
  return {
    ...nextState,
  };
};
