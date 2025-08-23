import lodash from 'lodash';
import { produce } from 'immer';

const updatePolicyBackgrounds = (state: any, { payload }: any) => {
  const nextState = produce(state, (draftState) => {
    const temp = draftState;
    const colors = ['#269ea3', '#ffd444'];

    const { policyNoList } = payload;
    lodash.forEach(policyNoList, (item, key) => {
      temp.policyBackgrounds = {
        [item?.policyNo]: colors?.[Number(key) % 2],
      };
    });
  });
  return { ...nextState };
};

export default updatePolicyBackgrounds;
