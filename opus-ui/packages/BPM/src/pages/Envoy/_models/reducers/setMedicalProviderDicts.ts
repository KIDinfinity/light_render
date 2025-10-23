import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, { payload }: any) => {
  const { medicalProviderDicts, medicalProviderRows } = lodash.pick(payload, [
    'medicalProviderDicts',
    'medicalProviderRows',
  ]);
  if (!!medicalProviderRows) {
    return produce(state, (draftState: any) => {
      lodash.forEach(medicalProviderRows, (data: any) => {
        const dictCodeValue = data?.dictCode;
        if (dictCodeValue) {
          lodash.set(draftState, `medicalProviderDicts.${dictCodeValue}`, data?.dictName);
        }
      });
    });
  }
  return produce(state, (draftState: any) => {
    lodash.set(draftState, 'medicalProviderDicts', medicalProviderDicts);
  });
};
