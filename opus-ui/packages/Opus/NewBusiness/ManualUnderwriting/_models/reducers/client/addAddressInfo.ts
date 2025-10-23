import { produce } from 'immer';
import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { Region, tenant } from '@/components/Tenant';
import CustomerType from 'opus/NewBusiness/Enum/CustomerType';
import { formUtils } from 'basic/components/Form';

export const addAddressInfo = (
  draftState: any,
  { id, changedValues }: { id: string; changedValues: any }
) => {
  const newAddressInfoId = uuidv4();
  draftState.modalData.entities.clientMap[id].addressInfoList = lodash
    .chain(draftState.modalData.entities.clientMap[id].addressInfoList)
    .concat([newAddressInfoId])
    .compact()
    .value();

  const customerType = lodash.get(
    draftState,
    `modalData.entities.clientMap.${id}.personalInfo.customerType`,
    ''
  );

  draftState.modalData.entities.addressInfoMap[newAddressInfoId] = {
    id: newAddressInfoId,
    isManuallyAdded: 1,
    ...tenant.region({
      [Region.TH]:
        formUtils.queryValue(customerType) == CustomerType.Entity ? { country: 'TH' } : {},
    }),
    ...changedValues,
  };
};

export default (state: any, { payload }: any) => {
  const { id, changedValues } = payload;
  const nextState = produce(state, (draftState: any) => {
    addAddressInfo(draftState, { id, changedValues });
  });
  return { ...nextState };
};
