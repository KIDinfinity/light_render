import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { v4 as uuidv4 } from 'uuid';
import payeeItemAdd from './paymentPayeeItemAdd';

const getClientName = ({ organization, companyName, firstName, middleName, surname }: any) => {
  return !!formUtils.queryValue(organization)
    ? formUtils.queryValue(companyName)
    : lodash
        .compact([firstName, middleName, surname].map((data) => formUtils.queryValue(data)))
        .join(' ');
};

export default (state, action) => {
  const { benefitItemId, id, fullName, isOrganization } = action?.payload || {};
  return produce(state, (draftState) => {
    if (!!isOrganization) {
      draftState.paymentModal.datas.policyBenefitList = lodash
        .chain(draftState.paymentModal.datas.policyBenefitList)
        .map((item: any) => {
          return item.id === benefitItemId
            ? {
                ...item,
                beneficiaryList: lodash.map(
                  item?.beneficiaryList || [],
                  (beneficiaryItem: any) => ({
                    ...beneficiaryItem,
                    companyName: beneficiaryItem.id === id ? fullName : '',
                  })
                ),
              }
            : item;
        })
        .value();
    } else {
      const benefitItem = draftState.paymentModal.datas.policyBenefitList.find(
        (item) => item.id === benefitItemId
      );
      const beneficiaryItem = benefitItem.beneficiaryList.find(
        (beneficiary) => beneficiary.id === id
      );
      const payeeId = beneficiaryItem.payeeId;

      const otherPayees = draftState.paymentModal.datas?.payeeList?.filter(
        (payee) => payee.id !== payeeId
      );
      const otherPayeeNames = otherPayees?.map(getClientName);
      // is this person already in the payee List, if true, link them / relink
      if (otherPayeeNames.includes(fullName)) {
        const payeeIndex = otherPayeeNames.indexOf(fullName);
        const matchedPayee = otherPayees[payeeIndex];
        if (
          !benefitItem.beneficiaryList?.some(
            (beneficiary) => beneficiary.payeeId === matchedPayee.id
          )
        ) {
          beneficiaryItem.payeeId = matchedPayee.id;
          beneficiaryItem.firstName = matchedPayee.firstName;
          beneficiaryItem.middleName = matchedPayee.middleName;
          beneficiaryItem.surname = matchedPayee.surname;
          beneficiaryItem.clientId = formUtils.queryValue(matchedPayee.clientId);

          const beneficiaryData = draftState.paymentModal.datas.c360PolicyInfo?.policyBeneficiaryList?.find(
              ({ clientId }) => clientId === formUtils.queryValue(matchedPayee.clientId)
            );
          if (beneficiaryData?.beneficiaryPercentage !== void 0)
            beneficiaryItem.beneficiaryPercentage = beneficiaryData.beneficiaryPercentage;
        }
      } else {
        // if name is being changed
        if (fullName && fullName !== getClientName(beneficiaryItem)) {
          beneficiaryItem.firstName = fullName;
          beneficiaryItem.middleName = '';
          beneficiaryItem.surname = '';
          // if already linked && isNewClient, change payee name, otherwise create new payee & link
          const payeeItem = draftState.paymentModal.datas?.payeeList.find(
            (payee) => payee.id === payeeId
          );
          if (payeeItem?.isNewClient) {
            if (payeeItem) {
              payeeItem.firstName = fullName;
              payeeItem.middleName = '';
              payeeItem.surname = '';
            }
          } else {
            // NEW PAYEE
            if (fullName) {
              let clientInfo = null;

              const c360 = draftState.paymentModal.datas.c360PolicyInfo;
              const beneficiaryPairs = c360?.policyBeneficiaryList?.map((beneficiaryData) => {
                return [
                  beneficiaryData,
                  c360.clientInfoList.find(({ clientId }) => clientId === beneficiaryData.clientId),
                ];
              });
              const matchedPair = beneficiaryPairs?.find(
                (pair) => getClientName(pair[1]) === fullName
              );
              if (matchedPair) {
                clientInfo = matchedPair[1];
                beneficiaryItem.beneficiaryPercentage = matchedPair[0].beneficiaryPercentage || 0;
              }
              // const matchedBeneficiary;
              if (!clientInfo) {
                clientInfo = c360?.clientInfoList?.find(
                  (clientInfo) => getClientName(clientInfo) === fullName
                );
              }

              const newPayeeId = uuidv4();
              beneficiaryItem.payeeId = newPayeeId;
              beneficiaryItem.clientId = clientInfo?.clientId;
              const { paymentModal } = payeeItemAdd(draftState, {
                payload: {
                  extraData: {
                    firstName: fullName,
                    middleName: '',
                    surname: '',
                    id: newPayeeId,
                    payeeType: beneficiaryItem.payTo,
                    ...clientInfo,
                    isNewClient: !clientInfo,
                  },
                },
              });
              draftState.paymentModal.datas.payeeList = paymentModal.datas.payeeList;
            }
          }
        }
      }
    }
  });
};
