import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { relationshipWithInsuredForJP, PaymentType } from 'claim/enum';
import { PAYEEITEM } from '@/utils/claimConstant';
import { saveDefaultPayee, saveNormalizedPayee } from 'claim/pages/utils/getPayeeDefaultData';
import { getPolicyOwnerInfo } from 'claimBasicProduct/reducers/saveClaimant/utils';

const keysInsured = [
  'clientId',
  'dateOfBirth',
  'firstName',
  'surname',
  'middleName',
  'gender',
  'identityNo',
  'identityType',
  'contactType',
  'phoneNo',
  'email',
  'address',
  'address2',
  'sms',
  'postCode',
];

export default ({ draftState, changedFields, payeeId }: any) => {
  if (!lodash.has(changedFields, 'payeeType')) return;
  const draft = draftState;
  let payeeTemp = {
    ...draftState.claimEntities.payeeListMap[payeeId],
    ...changedFields,
    id: payeeId,
  };
  const policyOwnerList = lodash.get(draftState, 'policyOwnerList', []);
  const policyId = lodash.get(draftState.claimProcessData.insured, 'policyId', '');
  const policyOwnerInfo = getPolicyOwnerInfo(formUtils.queryValue(policyId), policyOwnerList);

  switch (formUtils.queryValue(changedFields.payeeType)) {
    case relationshipWithInsuredForJP.Self:
      payeeTemp = {
        ...payeeTemp,
        ...lodash.pick(draftState.claimProcessData.insured, keysInsured),
        organization: 0,
      };
      break;
    case relationshipWithInsuredForJP.PolicyOwner:
      payeeTemp = {
        ...payeeTemp,
        ...policyOwnerInfo,
        ...lodash.pick(draftState.claimProcessData.claimant, keysInsured),
        organization: 0,
        id: payeeTemp.id,
      };

      break;
    case relationshipWithInsuredForJP.Others:
      payeeTemp = {
        ...payeeTemp,
        ...changedFields,
        firstName: '',
        surname: '',
        organization: 0,
        phoneNo: '',
        email: '',
        postCode: '',
        address: '',
        accountHolder: '',
        id: payeeTemp.id,
      };
      break;
    default:
      payeeTemp = {
        ...payeeTemp,
        ...PAYEEITEM,
        ...changedFields,
        bankType: '',
        accountType: '',
        id: payeeTemp.id,
        paymentType: payeeTemp?.paymentType || PaymentType.LS,
      };

      break;
  }

  // payeeTemp.telNo = payeeTemp.phoneNo;

  const newPayeeTemp = saveDefaultPayee(payeeTemp, changedFields);

  const result = saveNormalizedPayee(draft.claimEntities.payeeListMap, newPayeeTemp, payeeId);

  draft.claimProcessData.payeeList = result.payeeList;
  draft.claimEntities.payeeListMap = result.payeeListMap;
};
