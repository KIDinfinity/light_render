import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { SubmissionChannel, relationshipWithInsuredForHK } from 'claim/enum';
import { getDefaultPayeeId, saveDefaultPayee } from 'claim/pages/utils/getPayeeDefaultData';
import { getSelectInsuredInfo, getPolicyOwnerInfo } from '../functions';
import addPayeeInfoItem from './addPayeeInfoItem';

const saveSelectInsuredInfo = (state: any, action: any) => {
  const { selectColumns, skipPolicyNo = false, combineClaimantInfo } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const payeeListMapData = lodash.get(state, 'claimEntities.payeeListMap');
    const submissionChannel = lodash.get(state, 'claimProcessData.submissionChannel');
    const isGOPBillingCase =
      formUtils.queryValue(submissionChannel) === SubmissionChannel.GOPBilling;
    const { searchInsuredObj } = draftState;
    const payeeId = getDefaultPayeeId(payeeListMapData);
    const policyOwnerList = lodash.get(draftState, 'policyOwnerList', []);
    const newInsuredInfo = {
      ...getSelectInsuredInfo(selectColumns, skipPolicyNo),
    };
    const oldInsuredId = draftState.claimProcessData.insured.insuredId;
    const newInsuredId = newInsuredInfo.insuredId;
    const draft = draftState;

    draft.claimProcessData.insured = {
      ...draftState.claimProcessData.insured,
      ...newInsuredInfo,
    };
    // TODO 优化insured.policyId 的取值
    draft.claimProcessData.insured.policyId =
      formUtils.queryValue(draft.claimProcessData.insured.policyId) ||
      formUtils.queryValue(searchInsuredObj?.policyId);
    const { policyId } = draftState.claimProcessData.insured;
    const policyOwnerInfo = getPolicyOwnerInfo(formUtils.queryValue(policyId), policyOwnerList);
    const combineClaimt =
      draft.claimProcessData.claimant?.idOcrResult === 'S'
        ? {
            ...lodash.pick(draft.claimProcessData.claimant, [
              'idIssueDate',
              'idType',
              'ageAdmitIndicator',
            ]),
            ...lodash.pick(combineClaimantInfo, [
              'idExpiryDate',
              'idNoExpiryDateFlag',
              'idValidityResult',
              'idExemptedFlag',
            ]),
          }
        : lodash.pick(combineClaimantInfo, [
            'idType',
            'idIssueDate',
            'idExpiryDate',
            'idNoExpiryDateFlag',
            'ageAdmitIndicator',
            'idValidityResult',
            'idExemptedFlag',
          ]);
    draft.claimProcessData.claimant = {
      ...policyOwnerInfo,
      ...combineClaimt,
      idOcrResult: draft.claimProcessData.claimant?.idOcrResult,
      relationshipWithInsured: relationshipWithInsuredForHK.policyOwner,
    };
    if (!lodash.isEqual(oldInsuredId, newInsuredId)) {
      let payeeItem = {};
      let id = '';
      if (!payeeId) {
        const temp = addPayeeInfoItem(draftState);
        const payeeListMap = lodash.get(temp, 'claimEntities.payeeListMap');
        const payeeList = lodash.get(temp, 'claimProcessData.payeeList');
        id = lodash.head(payeeList) || '';
        lodash.set(draft, 'claimProcessData.payeeList', payeeList);
        payeeItem = payeeListMap?.[id] || {};
      } else {
        payeeItem = lodash.get(draftState, `claimEntities.payeeListMap.${payeeId}`, {});
      }
      const payeeItemData = lodash.pick(policyOwnerInfo, [
        'address',
        'clientId',
        'dateOfBirth',
        'email',
        'firstName',
        'gender',
        'identityNo',
        'identityType',
        'middleName',
        'phoneNo',
        'postCode',
        'surname',
      ]);
      const defaultPayee = isGOPBillingCase
        ? {
            ...payeeItem,
            payeeType: relationshipWithInsuredForHK.medicalProvider,
            organization: 1,
            paymentMethod: '',
            accountHolder: '',
          }
        : saveDefaultPayee({
            ...payeeItem,
            payeeType: isGOPBillingCase
              ? relationshipWithInsuredForHK.medicalProvider
              : relationshipWithInsuredForHK.policyOwner,
            ...payeeItemData,
            paymentMethod: '',
            accountHolder: '',
          });
      lodash.set(draft, `claimEntities.payeeListMap.${payeeId || id}`, defaultPayee);
    }
  });
  return { ...nextState };
};

export default saveSelectInsuredInfo;
