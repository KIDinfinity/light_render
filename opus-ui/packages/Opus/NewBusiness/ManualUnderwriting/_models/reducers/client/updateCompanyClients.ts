import { produce } from 'immer';
import lodash from 'lodash';
import CustomerRole from 'basic/enum/CustomerRole';
import CustomerType from 'opus/NewBusiness/Enum/CustomerType';

export default (state: any, { payload }: any) => {
  const { processData, entities } = payload;
  console.log({ state: JSON.parse(JSON.stringify(state)), processData, entities });

  const nextState = produce(state, (draftState: any) => {
    const modalEntities = draftState.modalData.entities;
    const modalProcessData = draftState.modalData.processData;
    const { clientMap, addressInfoMap, contactInfoMap, crtInfoMap } = entities;
    const { clientInfoList } = processData;
    draftState.modalData.entities = {
      ...modalEntities,
      clientMap: { ...(modalEntities?.clientMap ?? {}), ...clientMap },
      addressInfoMap: { ...(modalEntities?.addressInfoMap ?? {}), ...addressInfoMap },
      contactInfoMap: { ...(modalEntities?.contactInfoMap ?? {}), ...contactInfoMap },
      crtInfoMap: { ...(modalEntities?.crtInfoMap ?? {}), ...crtInfoMap },
    };
    draftState.modalData.processData = {
      ...modalProcessData,
      clientInfoList: [...modalProcessData.clientInfoList, ...clientInfoList],
    };
    const payor = lodash
      .values(draftState.modalData.entities.clientMap)
      .find(
        (c) =>
          c.personalInfo.customerType === CustomerType.Entity &&
          c.personalInfo.customerRole?.includes(CustomerRole.Payor)
      );
    draftState.editingClientId = payor?.id;
  });
  return { ...nextState };
};
