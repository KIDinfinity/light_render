import { produce }  from 'immer';
import lodash from 'lodash';
import CustomerRole from 'process/NB/Enum/CustomerRole';
import { formUtils } from 'basic/components/Form';
import CustomerType from 'process/NB/Enum/CustomerType';
import CustomerRoleType from 'process/NB/Enum/CustomerRole';

const specialRoles = [CustomerRole.Insured, CustomerRole.Beneficiary];

export default (state: any, action: any) => {
  const { clientId, changedFields } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    const clientInfoList = lodash.get(draftState, 'businessData.policyList[0].clientInfoList', []);
    const clientIndex = lodash.findIndex(clientInfoList, (item: any) => item.id === clientId);
    let customerRole = formUtils.queryValue(changedFields?.customerRole);
    // 设置witness role 与其他role互斥，如果有witness，取消其他role
    if (customerRole.includes(CustomerRoleType.Witness)) {
      customerRole = [CustomerRoleType.Witness];
    }
    const count = lodash.reduce(
      customerRole,
      (sum: number, i: CustomerRole) => {
        if (specialRoles.includes(i)) {
          // eslint-disable-next-line no-param-reassign
          return (sum += 1);
        }
        return sum;
      },
      0
    );

    // 当role取两都属于specialRoles或者当单选role属于specialRoles的话, customerType默认为P
    if (count === customerRole.length) {
      lodash.set(
        draftState,
        `businessData.policyList[0].clientInfoList[${clientIndex}].customerType`,
        CustomerType.Individual
      );
    }

    const legitRoles = customerRole.filter((role: CustomerRole) => {
      if (
        [
          CustomerRole.Insured,
          CustomerRole.Beneficiary,
          CustomerRole.CoBorrower,
          CustomerRole.LegalRepresentative,
          CustomerRole.Payor,
          CustomerRole.LegalRepresentative,
        ].includes(role)
      )
        return true;
      return !clientInfoList?.some((client) => {
        const flag =
          client.id !== clientId &&
          !client.deleted &&
          client.roleList?.some((roleData) => roleData.customerRole === role && !roleData.deleted);
        return flag;
      });
    });
    const currentClient = clientInfoList[clientIndex];
    const nextClientRoleList = currentClient.roleList?.map((roleData) => {
      if (legitRoles.includes(roleData.customerRole)) {
        return {
          ...roleData,
          deleted: 0,
        };
      } else {
        return {
          ...roleData,
          deleted: 1,
        };
      }
    });
    clientInfoList[clientIndex].roleList = nextClientRoleList || [];
    const newRoles = legitRoles
      .filter((role) => !nextClientRoleList?.some((roleData) => roleData.customerRole === role))
      .map((role) => {
        return {
          customerRole: role,
        };
      });
    if (newRoles.length) {
      lodash.set(
        draftState,
        `businessData.policyList[0].clientInfoList[${clientIndex}].roleList`,
        (currentClient.roleList || []).concat(newRoles)
      );
    }
  });

  return { ...nextState };
};
