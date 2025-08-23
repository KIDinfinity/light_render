import lodash from 'lodash';
import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';
import { relationshipWithInsuredForHK } from 'claim/enum';

const getClientName = (client) =>
  lodash
    .compact(
      [client.firstName, client.middleName, client.surname].map((data) =>
        formUtils.queryValue(data)
      )
    )
    .join(' ');

const PayeeItemUpdate = (state: any, { payload }: any) => {
  const { id, changedFields } = payload || {};
  const nextState = produce(state, (draftState: any) => {
    const payeeIndex = draftState.claimData.payeeList.findIndex((payee) => payee.id === id);

    if (payeeIndex === -1) return;

    draftState.claimData.payeeList[payeeIndex] = {
      ...draftState.claimData.payeeList[payeeIndex],
      ...changedFields,
    };

    if (Object.keys(changedFields).length === 1) {
      draftState.claimData.payeeList[payeeIndex].manualAdd = 'Y';
      if (
        lodash.has(changedFields, 'firstName') ||
        lodash.has(changedFields, 'middleName') ||
        lodash.has(changedFields, 'surname')
      ) {
        draftState.claimData.policyBenefitList = draftState.claimData.policyBenefitList.map(
          (benefitItem) => {
            return {
              ...benefitItem,
              beneficiaryList:
                benefitItem.beneficiaryList?.map((beneficiary) => {
                  if (beneficiary.payeeId !== id) {
                    return beneficiary;
                  }
                  // 这里会把带校验的对象set过去，但应该不会导致问题，只需要注意一下
                  return {
                    ...beneficiary,
                    payeeName: getClientName(draftState.claimData.payeeList[payeeIndex]),
                    ...changedFields,
                  };
                }) || [],
            };
          }
        );
      }

      if (lodash.has(changedFields, 'clientId')) {
        draftState.claimData.policyBenefitList = draftState.claimData.policyBenefitList.map(
          (benefitItem) => {
            return {
              ...benefitItem,
              beneficiaryList:
                benefitItem.beneficiaryList?.map((beneficiary) => {
                  if (beneficiary.payeeId !== id) {
                    return beneficiary;
                  }
                  return {
                    ...beneficiary,
                    clientId: formUtils.queryValue(changedFields.clientId),
                  };
                }) || [],
            };
          }
        );
      }

      if (lodash.has(changedFields, 'payeeType')) {
        const payeeType = formUtils.queryValue(changedFields.payeeType);
        let availableClientIds = [];
        const c360 = draftState.claimData.c360PolicyInfo;
        if (payeeType !== relationshipWithInsuredForHK.others) {
          const getClientIds = (list) =>
            list
              .filter(
                (client) =>
                  !draftState.claimData.payeeList.some(
                    ({ clientId }) => client.clientId === clientId
                  )
              )
              .map(({ clientId }) => clientId);
          if (payeeType === relationshipWithInsuredForHK.policyOwner)
            availableClientIds = getClientIds(c360?.policyOwnerList || []);
          if (payeeType === relationshipWithInsuredForHK.self)
            availableClientIds = getClientIds(c360?.policyInsuredList || []);

          if (availableClientIds.length === 1) {
            const clientInfo = c360.clientInfoList.find(
              ({ clientId }) => clientId === availableClientIds[0]?.clientId
            );
            draftState.claimData.payeeList[payeeIndex] = {
              ...draftState.claimData.payeeList[payeeIndex],
              ...clientInfo,
              isNewClient: false,
            };
          } else {
            if (payeeType === relationshipWithInsuredForHK.beneficiary)
              availableClientIds = getClientIds(c360?.policyBeneficiaryList || []);

            if (availableClientIds.length) {
              draftState.beneficiaryPopUp = {
                isShow: true,
                fillInPayeeId: id,
                availableClientIds,
                mandatory: payeeType !== relationshipWithInsuredForHK.beneficiary,
              };
            }
          }
        }
      }

      if (changedFields.usCitizen) {
        const usCitizen = formUtils.queryValue(changedFields.usCitizen);

        // 去掉errors标记
        if (!usCitizen) {
          draftState.claimData.payeeList[payeeIndex] = {
            ...draftState.claimData.payeeList[payeeIndex],
            usCitizenPassportNo: formUtils.queryValue(
              draftState.claimData.payeeList[payeeIndex].usCitizenPassportNo
            ),
            usCitizenResidenceAddress: formUtils.queryValue(
              draftState.claimData.payeeList[payeeIndex].usCitizenResidenceAddress
            ),
            usCitizenTaxIdentityNo: formUtils.queryValue(
              draftState.claimData.payeeList[payeeIndex].usCitizenTaxIdentityNo
            ),
          };
        }
      }
    }
  });
  return { ...nextState };
};

export default PayeeItemUpdate;
