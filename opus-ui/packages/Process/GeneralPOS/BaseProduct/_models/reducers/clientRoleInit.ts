/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import lodash from 'lodash';
import { tenant } from '@/components/Tenant';

const checkEqual = (a, b) => !lodash.isEmpty(a) && !lodash.isEmpty(b) && a === b;

export default (state: any) =>
  produce(state, (draftState: any) => {
    const policyInfo = draftState.processData?.policyInfo;
    const { mainPolicyId, mainInsuredClientId, mainOwnerClientId, mainPayorClientId } =
      draftState.processData?.policyInfo;

    const agentInfo =
      lodash.find(policyInfo?.policyAgentList, (item) => item.policyId === mainPolicyId) || {};

    const OwnerRoleList = ['CUS002'];
    let OtherRoleList = [
      {
        role: 'SA',
        name: [agentInfo.firstName, agentInfo.middleName, agentInfo.surname]
          .filter((item) => item)
          .join(' '),
      },
    ];

    // 兼容旧版取值逻辑
    if (checkEqual(mainOwnerClientId, mainInsuredClientId)) {
      OwnerRoleList.push('CUS001');
    }

    if (tenant.isTH() || tenant.isMY()) {
      if (checkEqual(mainOwnerClientId, mainPayorClientId)) {
        OwnerRoleList.push('CUS005');
      }

      const otherRoleClientIdList = [
        policyInfo?.mainInsuredClientId,
        policyInfo?.mainPayorClientId,
      ].filter((item) => item);
      OtherRoleList.push(
        ...(policyInfo?.policyClientRoleList
          ?.map((item) => {
            if (
              otherRoleClientIdList.includes(item?.clientId) &&
              !OwnerRoleList.includes(item?.customerRole) &&
              item?.policyId === mainPolicyId
            ) {
              const info = policyInfo?.clientInfoList?.find(
                (clientItem) => clientItem?.clientId === item?.clientId
              );
              return {
                role: item?.customerRole,
                name: [info?.firstName, info?.middleName, info?.surname]
                  .filter((item) => item)
                  .join(' '),
              };
            }

            return false;
          })
          ?.filter((item) => item) || [])
      );
    }
    OtherRoleList = lodash.uniqBy(OtherRoleList, 'role');

    // 合并对应同用户的Payor和Insured
    if (OtherRoleList.length > 1) {
      const updatedList = lodash.chain(OtherRoleList).uniqBy('name').value();

      OtherRoleList = updatedList.map((listItem: any) => {
        const sameName = OtherRoleList.filter((item: any) => item.name === listItem.name);

        if (sameName.length > 1) {
          const otherRoles: any[] = [];

          sameName.forEach((cur: any) => {
            if (cur.role !== listItem.role) {
              otherRoles.push(cur.role);
            }
          });
          return { ...listItem, otherRoles };
        }
        return listItem;
      }, []);
    }

    draftState.clientRole = {
      OwnerRoleList: lodash.uniq(OwnerRoleList),
      OtherRoleList,
    };
    draftState.selectRole = 'SA';
  });
