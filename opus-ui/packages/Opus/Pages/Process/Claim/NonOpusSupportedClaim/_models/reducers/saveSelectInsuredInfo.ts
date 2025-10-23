import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { assignByKeys } from 'claim/pages/utils/fnObject';
import { relationshipWithInsuredForHK } from 'claim/enum';
import getSelectInsuredInfo from '../functions/getSelectInsuredInfo';

const saveSelectInsuredInfo = (state: any, action: any) => {
  const { selectColumns, skipPolicyNo = false, taskDetail } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const submissionDate = draftState?.businessData?.submissionDate;
    const searchInsuredObj = draftState?.searchInsuredObj;
    // const policyOwnerList = lodash.get(draftState, 'policyOwnerList', []);
    const newInsuredInfo = {
      ...getSelectInsuredInfo(selectColumns, skipPolicyNo, taskDetail, submissionDate),
    };
    const oldInsuredId = draftState.businessData.insured.insuredId;
    const newInsuredId = newInsuredInfo.insuredId;

    const draft = draftState;

    draft.businessData.insured = {
      ...draftState.businessData.insured,
      ...newInsuredInfo,
    };
    draft.businessData.insured.policyId =
      formUtils.queryValue(searchInsuredObj?.policyId) ||
      formUtils.queryValue(draft.businessData.insured.policyId);
    const { policyId } = draft.businessData.insured;
    // const policyOwnerInfo = getPolicyOwnerInfo(formUtils.queryValue(policyId), policyOwnerList);
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

    const contactMap = [
      'address',
      'address2',
      'contactType',
      'email',
      'postCode',
      'sms',
      'phoneNo',
    ];

    draftState.businessData.claimant = {
      ...draftState.businessData.claimant,
      ...assignByKeys(
        draftState.businessData.claimant,
        draftState.businessData.insured,
        keysInsured
      ),
      relationshipWithInsured: relationshipWithInsuredForHK.self,
      age: draftState.businessData.insured?.age,
    };

    if (!lodash.isEqual(oldInsuredId, newInsuredId)) {
      const contactData = lodash.pick(draftState.businessData.claimant, contactMap);
      contactData.telNo = contactData.phoneNo;
      delete contactData.phoneNo;
    }
  });
  return { ...nextState };
};

export default saveSelectInsuredInfo;
