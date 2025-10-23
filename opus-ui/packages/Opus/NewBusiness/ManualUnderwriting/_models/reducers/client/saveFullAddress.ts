import { produce } from 'immer';

const addrFieldMap: any = {
  C: 'currentAddress',
  B: 'businessAddress',
  R: 'residentialAddress',
  I: 'identityAddress',
};

export default (state: any, { payload }: any) => {
  const { fullAddressList = [] } = payload;
  const nextState = produce(state, (draftState: any) => {
    const { editingClientId } = draftState;

    fullAddressList.forEach((item: any) => {
      const { addressId, addrType, fullAddress } = item;

      draftState.entities.addressInfoMap[addressId] = {
        ...draftState.entities.addressInfoMap[addressId],
        fullAddress,
      };

      draftState.entities.clientMap[editingClientId].contactInfoKH = {
        ...draftState.entities.clientMap[editingClientId].contactInfoKH,
        [addrFieldMap[addrType]]: fullAddress,
      };
    });
  });

  return {
    ...nextState,
  };
};
