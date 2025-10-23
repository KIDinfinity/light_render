import { tenant } from '@/components/Tenant';
import bmi from '@/utils/bmi';
import { formUtils } from 'basic/components/Form';
import CustomerRole from 'basic/enum/CustomerRole';
import { produce } from 'immer';
import lodash from 'lodash';
import CustomerType from 'opus/NewBusiness/Enum/CustomerType';
import { deleteCurrentClient } from './deleteCurrentClient';
import { addNewClient } from './addNewClient';
import BooleanEnum from 'basic/enum/BooleanEnum';

export default (state: any, { payload }: any) => {
  const { changedFields, id, crtInfoItemId } = payload;
  const retrieveExistCorpFromLAToggle = state.retrieveExistCorpFromLA === BooleanEnum.Yes;

  const nextState = produce(state, (draftState: any) => {
    if (lodash.size(changedFields) === 1) {
      if (lodash.has(changedFields, 'height') || lodash.has(changedFields, 'weight')) {
        const weight = lodash.has(changedFields, 'weight')
          ? formUtils.queryValue(changedFields?.weight)
          : formUtils.queryValue(
              lodash.get(draftState, `modalData.entities.clientMap[${id}].personalInfo.weight`)
            );
        const height = lodash.has(changedFields, 'height')
          ? formUtils.queryValue(changedFields?.height)
          : formUtils.queryValue(
              lodash.get(draftState, `modalData.entities.clientMap[${id}].personalInfo.height`)
            );
        if (+height && +weight) {
          changedFields.bmi = bmi({ height, weight });
        } else {
          changedFields.bmi = 0;
        }
      }

      if (lodash.has(changedFields, 'customerType')) {
        const customerType = formUtils.queryValue(changedFields?.customerType);
        if (retrieveExistCorpFromLAToggle) {
          const customerRole = formUtils.queryValue(
            draftState.modalData.entities.clientMap[id].personalInfo.customerRole
          );
          if (lodash.isEqual(customerRole, [CustomerRole.Payor])) {
            deleteCurrentClient({ draftState, clientId: id });
            addNewClient({
              draftState,
              changedValues: { personalInfo: { customerType, customerRole } },
            });
            return;
          }
        } else {
          if (customerType == CustomerType.Entity && tenant.isTH()) {
            const AddressInfoList = draftState.modalData.entities.clientMap[id].addressInfoList;
            const addressInfoMap = draftState.modalData.entities.addressInfoMap;

            lodash.forEach(AddressInfoList, (addressId) => {
              const currentAddressItem = addressInfoMap[addressId];
              if (currentAddressItem?.addrType !== 'US') {
                draftState.modalData.entities.addressInfoMap[addressId].country = 'TH';
              }
            });
          }
        }
      }

      if (
        lodash.has(changedFields, 'beneficiaryType') &&
        formUtils.queryValue(changedFields?.beneficiaryType) === 'TB'
      ) {
        changedFields.share = 0;
      }
      if (lodash.has(changedFields, 'identityType')) {
        changedFields.identityNo = '';
        changedFields.ctfStartDate = '';
        changedFields.expiryDate = '';
      }
    }

    if (lodash.has(changedFields, 'lifelongIndicator')) {
      lodash.set(
        draftState,
        `modalData.entities.crtInfoMap[${crtInfoItemId}].lifelongIndicator`,
        changedFields?.lifelongIndicator
      );
    }
    draftState.modalData.entities.clientMap[id].personalInfo = {
      ...draftState.modalData.entities?.clientMap[id]?.personalInfo,
      ...changedFields,
      companyRegistrationNumberSearch: undefined, // 不保存到redux
    };
  });

  return {
    ...nextState,
  };
};
