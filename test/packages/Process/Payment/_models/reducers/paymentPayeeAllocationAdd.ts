import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { formUtils } from 'basic/components/Form';
import { relationshipWithInsuredForHK } from 'claim/enum';
import { subtract } from '@/utils/precisionUtils';

const getClientName = (client) =>
  lodash
    .compact(
      [client.firstName, client.middleName, client.surname].map((data) =>
        formUtils.queryValue(data)
      )
    )
    .join(' ');

/**
 *
 *  TODO
 * 拿clientId应该统一配置
 */
const payeeAllocationAdd = (state: any, { payload }: any) => {
  const { payTo, id } = payload;
  const benefitItem = state.paymentModal.datas.policyBenefitList?.find(
    (benefitItem) => benefitItem.id === id
  );
  if (!benefitItem) return state;

  const beneficiaryList = benefitItem?.beneficiaryList;
  if (!beneficiaryList) benefitItem.beneficiaryList = [];
  const beneficiaryPercentage = beneficiaryList.reduce(
    (sum, item) => subtract(sum, formUtils.queryValue(item.beneficiaryPercentage) || 0),
    100
  );
  const beneficiaryAmount = beneficiaryList.reduce(
    (sum, item) => subtract(sum, formUtils.queryValue(item.beneficiaryAmount) || 0),
    benefitItem.benefitAmount
  );

  if (!state.paymentModal.datas.payeeList) {
    state.paymentModal.datas.payeeList = [];
  }

  if (
    payTo === relationshipWithInsuredForHK.self ||
    payTo === relationshipWithInsuredForHK.policyOwner
  ) {
    const c360list =
      payTo === relationshipWithInsuredForHK.policyOwner
        ? state.paymentModal?.datas?.c360PolicyInfo?.policyOwnerList
        : state.paymentModal?.datas?.c360PolicyInfo?.policyInsuredList;
    let clientInfo = null;
    if (c360list?.length === 1) {
      clientInfo = state.paymentModal.datas.c360PolicyInfo.clientInfoList.find(
        (client) => client?.clientId === c360list[0]?.clientId
      );
    }

    beneficiaryList.push({
      payTo,
      id: uuidv4(),
      beneficiaryPercentage,
      beneficiaryAmount,
      payoutAmount: beneficiaryAmount,
      benefitAmount: benefitItem.benefitAmount,
      payeeName: getClientName(clientInfo || {}) || '',
      firstName: clientInfo?.firstName || '',
      middleName: clientInfo?.middleName || '',
      clientId: clientInfo?.clientId || '',
      policyNo: benefitItem?.policyNo,
    });

    if (clientInfo) {
      const payee = state.paymentModal.datas.payeeList.find(
        (payee) => getClientName(payee) === getClientName(clientInfo)
      );
      if (payee) {
        lodash.last(beneficiaryList).payeeId = payee.id;
        payee.clientId = clientInfo.clientId;
      } else {
        const id = uuidv4();
        lodash.last(beneficiaryList).payeeId = id;
        state.paymentModal.datas.payeeList.push({
          ...clientInfo,
          id,
          payeeType: payTo,
        });
      }
    }
  } else {
    beneficiaryList.push({
      payTo,
      id: uuidv4(),
      beneficiaryPercentage,
      beneficiaryAmount,
      payoutAmount: beneficiaryAmount,
      benefitAmount: benefitItem.benefitAmount,
      clientId: '',
      policyNo: benefitItem?.policyNo,
    });
  }


  return state;
};

export default payeeAllocationAdd;
