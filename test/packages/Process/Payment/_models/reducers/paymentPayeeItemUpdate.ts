import lodash from 'lodash';
import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';
import { relationshipWithInsuredForHK } from 'claim/enum';
import { PaymentMethod } from 'claim/pages/Enum';
import { SwitchEnum } from 'process/Utils/Payable';

const getClientName = (client) =>
  lodash
    .compact(
      [client.firstName, client.middleName, client.surname].map((data) =>
        formUtils.queryValue(data)
      )
    )
    .join(' ');

const paymentPayeeItemUpdate = (state: any, { payload }: any) => {
  const { id, changedFields } = payload || {};

  const nextState = produce(state, (draftState: any) => {
    const payeeIndex = draftState.paymentModal.datas.payeeList.findIndex(
      (payee) => payee.id === id
    );

    if (payeeIndex === -1) return;

    draftState.paymentModal.datas.payeeList[payeeIndex] = {
      ...draftState.paymentModal.datas.payeeList[payeeIndex],
      ...changedFields,
    };

    if (Object.keys(changedFields).length === 1) {
      draftState.paymentModal.datas.payeeList[payeeIndex].manualAdd = 'Y';
      if (
        lodash.has(changedFields, 'firstName') ||
        lodash.has(changedFields, 'middleName') ||
        lodash.has(changedFields, 'surname') ||
        lodash.has(changedFields, 'dateOfBirth') ||
        lodash.has(changedFields, 'companyName')
      ) {
        const payeeItem =
          formUtils.cleanValidateData(draftState.paymentModal.datas.payeeList[payeeIndex]) || {};

        draftState.paymentModal.datas.policyBenefitList = draftState.paymentModal.datas.policyBenefitList.map(
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
                    payeeName: !!formUtils.queryValue(payeeItem?.organization)
                      ? payeeItem?.companyName
                      : getClientName(payeeItem),
                    ...changedFields,
                  };
                }) || [],
            };
          }
        );
      }

      if (lodash.has(changedFields, 'clientId')) {
        draftState.paymentModal.datas.policyBenefitList = draftState.paymentModal.datas.policyBenefitList.map(
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
        const c360 = draftState.paymentModal.datas.c360PolicyInfo;
        if (payeeType !== relationshipWithInsuredForHK.others) {
          const getClientIds = (list) =>
            list
              .filter(
                (client) =>
                  !draftState.paymentModal.datas.payeeList.some(
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
            draftState.paymentModal.datas.payeeList[payeeIndex] = {
              ...draftState.paymentModal.datas.payeeList[payeeIndex],
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

      if (
        lodash.has(changedFields, 'paymentMethod') &&
        formUtils.queryValue(changedFields.paymentMethod) === PaymentMethod.ByCheckInPayee
      ) {
        const payee = draftState.paymentModal.datas.payeeList[payeeIndex];
        if (payee?.payeeBankAccountList?.length) {
          payee.payeeBankAccountList = payee.payeeBankAccountList.filter(
            (account) => account.manualAdd !== SwitchEnum.YES
          );
        }
      }

      if (changedFields.usCitizen) {
        const usCitizen = formUtils.queryValue(changedFields.usCitizen);

        // 去掉errors标记
        if (!usCitizen) {
          draftState.paymentModal.datas.payeeList[payeeIndex] = {
            ...draftState.paymentModal.datas.payeeList[payeeIndex],
            usCitizenPassportNo: formUtils.queryValue(
              draftState.paymentModal.datas.payeeList[payeeIndex].usCitizenPassportNo
            ),
            usCitizenResidenceAddress: formUtils.queryValue(
              draftState.paymentModal.datas.payeeList[payeeIndex].usCitizenResidenceAddress
            ),
            usCitizenTaxIdentityNo: formUtils.queryValue(
              draftState.paymentModal.datas.payeeList[payeeIndex].usCitizenTaxIdentityNo
            ),
          };
        }
      }
    }
  });
  return { ...nextState };
};

export default paymentPayeeItemUpdate;
