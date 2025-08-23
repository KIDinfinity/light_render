import { produce } from 'immer';
import lodash from 'lodash';

import { formUtils } from 'basic/components/Form';
import CustomerRole from 'process/NewBusiness/Enum/CustomerRole';
import CustomerType from 'process/NewBusiness/Enum/CustomerType';
import BooleanEnum from 'basic/enum/BooleanEnum';
import { v4 as uuidv4 } from 'uuid';

export default (state: any, { payload }: any) => {
  const { changedFields, id } = payload;
  const nextState = produce(state, (draftState: any) => {
    if (lodash.size(changedFields) === 1) {
      if (lodash.has(changedFields, 'customerRole')) {
        const customerRole = formUtils.queryValue(changedFields.customerRole);
        if (lodash.includes(customerRole, CustomerRole.Witness)) {
          changedFields.customerRole = [CustomerRole.Witness];
        }
      }
    }

    draftState.modalData.entities.clientMap[id].personalInfo = {
      ...draftState.modalData.entities?.clientMap[id]?.personalInfo,
      ...changedFields,
    };

    if (
      (lodash.has(changedFields, 'customerRole') || lodash.has(changedFields, 'customerType')) &&
      lodash.isEmpty(draftState.authorisedSignatoryClientId)
    ) {
      const personalInfo = draftState.modalData.entities?.clientMap?.[id].personalInfo;
      const { customerType, customerRole } = lodash.pick(
        personalInfo,
        'customerType',
        'customerRole'
      );
      const isEntity = formUtils.queryValue(customerType) === CustomerType.Entity;
      const isAuthorisedSignatoryDispay =
        lodash.find(draftState.roleDicts, { dictCode: CustomerRole.AuthorisedSignatory })
          ?.display === BooleanEnum.Yes;
      const hasOwner = lodash.includes(
        formUtils.queryValue(customerRole),
        CustomerRole.PolicyOwner
      );
      if (isAuthorisedSignatoryDispay && isEntity && hasOwner) {
        const newId = uuidv4();
        draftState.authorisedSignatoryClientId = newId;
        draftState.modalData.entities.clientMap = {
          [newId]: {
            id: newId,
            personalInfo: { customerRole: [CustomerRole.AuthorisedSignatory] },
          },
          ...draftState.modalData.entities.clientMap,
        };
        draftState.modalData.processData.clientInfoList = [
          newId,
          ...draftState.modalData.processData.clientInfoList,
        ];
      }
    }
  });

  return {
    ...nextState,
  };
};
