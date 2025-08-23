import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { v4 as uuidv4 } from 'uuid';
import payeeItemAdd from './payeeItemAdd';

const getClientName = (client) =>
  lodash
    .compact(
      [client.firstName, client.middleName, client.surname].map((data) =>
        formUtils.queryValue(data)
      )
    )
    .join(' ');

export default (state, action) => {
  const { benefitItemId, id, fullName } = action?.payload || {};
  return produce(state, (draftState) => {
    const benefitItem = draftState.claimData.policyBenefitList.find(
      (item) => item.id === benefitItemId
    );
    const beneficiaryItem = benefitItem.beneficiaryList.find(
      (beneficiary) => beneficiary.id === id
    );
    const payeeId = beneficiaryItem.payeeId;

    const otherPayees = draftState.claimData?.payeeList.filter((payee) => payee.id !== payeeId);
    const otherPayeeNames = otherPayees.map(getClientName);
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

        const beneficiaryData = draftState.claimData.c360PolicyInfo?.policyBeneficiaryList?.find(
          ({ clientId }) => clientId === formUtils.queryValue(matchedPayee.clientId)
        );
        if(beneficiaryData?.beneficiaryPercentage !== void 0)
          beneficiaryItem.beneficiaryPercentage = beneficiaryData.beneficiaryPercentage;

      }
    } else {
      // if name is being changed
      if (fullName !== getClientName(beneficiaryItem)) {
        beneficiaryItem.firstName = fullName;
        beneficiaryItem.middleName = '';
        beneficiaryItem.surname = '';
        // if already linked && isNewClient, change payee name, otherwise create new payee & link
        const payeeItem = draftState.claimData?.payeeList.find((payee) => payee.id === payeeId);
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

            const c360 = draftState.claimData.c360PolicyInfo;
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
            if(!clientInfo) {
              clientInfo = c360?.clientInfoList?.find((clientInfo) => getClientName(clientInfo) === fullName)
            }

            const newPayeeId = uuidv4();
            beneficiaryItem.payeeId = newPayeeId;
            beneficiaryItem.clientId = clientInfo?.clientId;
            const {
              claimData: { payeeList },
            } = payeeItemAdd(draftState, {
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
            draftState.claimData.payeeList = payeeList;
          }
        }
      }
    }
  });
};
