import { formUtils } from 'basic/components/Form';
import CustomerRole from 'basic/enum/CustomerRole';
import { produce } from 'immer';
import lodash from 'lodash';
import CustomerType from 'opus/NewBusiness/Enum/CustomerType';

const filterRoles = [
  CustomerRole.AuthorisedSignatory,
  CustomerRole.UBO,
  CustomerRole.ControllingPerson,
  CustomerRole.Director,
];

export const deleteCurrentClient = ({ draftState, clientId }: any) => {
  const clientInfoList = lodash.get(draftState, 'modalData.processData.clientInfoList', []) || [];
  const addressInfoList =
    lodash.get(draftState, `modalData.entities.clientMap.${clientId}.addressInfoList`, []) || [];
  const contactInfoList =
    lodash.get(draftState, `modalData.entities.clientMap.${clientId}.contactInfoList`, []) || [];
  const crtInfoList =
    lodash.get(draftState, `modalData.entities.clientMap.${clientId}.crtInfoList`, []) || [];

  draftState.modalData.processData.clientInfoList = clientInfoList.filter(
    (id: string) => id !== clientId
  );
  lodash.forEach(addressInfoList, (id) => {
    delete draftState.modalData.entities.addressInfoMap[id];
  });
  lodash.forEach(contactInfoList, (id) => {
    delete draftState.modalData.entities.contactInfoMap[id];
  });
  lodash.forEach(crtInfoList, (id) => {
    delete draftState.modalData.entities.crtInfoMap[id];
  });

  const clientMap = draftState.modalData.entities.clientMap;

  const deleteClient = draftState.modalData.entities.clientMap[clientId];
  if (
    formUtils.queryValue(deleteClient?.personalInfo?.customerRole)?.[0] === CustomerRole.Payor &&
    formUtils.queryValue(deleteClient?.personalInfo?.customerType) === CustomerType.Entity
  ) {
    // remove ubo clients
    const notEditableClientList = lodash.filter(clientInfoList, (id) =>
      lodash.includes(
        filterRoles,
        formUtils.queryValue(clientMap[id]?.personalInfo?.customerRole)?.[0]
      )
    );
    lodash.forEach(notEditableClientList, (id) => {
      deleteCurrentClient({ draftState, clientId: id });
    });
  }

  delete draftState.modalData.entities.clientMap[clientId];
  const editableClientList = lodash.filter(
    draftState.modalData?.processData?.clientInfoList,
    (id) =>
      !lodash.includes(
        filterRoles,
        formUtils.queryValue(
          draftState.modalData.entities.clientMap[id]?.personalInfo?.customerRole
        )?.[0]
      )
  );

  draftState.editingClientId = editableClientList?.[0];
};

export default (state: any, { payload }: any) => {
  const { clientId } = payload;
  const nextState = produce(state, (draftState: any) => {
    deleteCurrentClient({ draftState, clientId });
  });
  return { ...nextState };
};
