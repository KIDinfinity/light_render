import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { assignByKeys } from 'claim/pages/utils/fnObject';
import { relationshipWithInsuredForHK, PaymentType } from 'claim/enum';
import { getDefaultPayeeId } from 'claim/pages/utils/getPayeeDefaultData';
import { getSelectInsuredInfo } from '../functions';
import payeeAdd from './payeeAdd';

const saveSelectInsuredInfo = (state: any, action: any) => {
  const { selectColumns, skipPolicyNo = false, taskDetail } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const payeeListMapData = lodash.get(state, 'claimEntities.payeeListMap');
    const submissionDate = draftState?.claimProcessData?.submissionDate;
    const searchInsuredObj = draftState?.searchInsuredObj;
    const payeeId = getDefaultPayeeId(payeeListMapData);
    // const policyOwnerList = lodash.get(draftState, 'policyOwnerList', []);
    const newInsuredInfo = {
      ...getSelectInsuredInfo(selectColumns, skipPolicyNo, taskDetail, submissionDate),
    };
    const oldInsuredId = draftState.claimProcessData.insured.insuredId;
    const newInsuredId = newInsuredInfo.insuredId;
    const draft = draftState;

    draft.claimProcessData.insured = {
      ...draftState.claimProcessData.insured,
      ...newInsuredInfo,
    };
    draft.claimProcessData.insured.policyId =
      formUtils.queryValue(searchInsuredObj?.policyId) ||
      formUtils.queryValue(draft.claimProcessData.insured.policyId);
    const { policyId } = draft.claimProcessData.insured;
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

    draftState.claimProcessData.claimant = {
      ...draftState.claimProcessData.claimant,
      ...assignByKeys(
        draftState.claimProcessData.claimant,
        draftState.claimProcessData.insured,
        keysInsured
      ),
      relationshipWithInsured: relationshipWithInsuredForHK.self,
      age: draftState.claimProcessData.insured?.age,
    };

    if (!lodash.isEqual(oldInsuredId, newInsuredId)) {
      let payeeItem = {};
      let id = '';
      if (!payeeId) {
        const temp = payeeAdd(draftState);
        const payeeListMap = lodash.get(temp, 'claimEntities.payeeListMap');
        const payeeList = lodash.get(temp, 'claimProcessData.payeeList');
        id = lodash.head(payeeList) || '';
        lodash.set(draft, 'claimProcessData.payeeList', lodash.compact(payeeList));
        payeeItem = payeeListMap?.[id] || {};
      } else {
        payeeItem = lodash.get(draftState, `claimEntities.payeeListMap.${payeeId}`, {});
      }
      const payeeItemData = lodash.pick(draftState.claimProcessData.claimant, keysInsured);
      const contactData = lodash.pick(draftState.claimProcessData.claimant, contactMap);
      contactData.telNo = contactData.phoneNo;
      delete contactData.phoneNo;
      const payeeContactHead = lodash.head(payeeItem?.payeeContactList);
      payeeItem = lodash.set(payeeItem, 'payeeContactList[0]', {
        ...(payeeContactHead || {}),
        ...contactData,
      });

      // payeeItemData.telNo = payeeItemData.phoneNo;

      lodash.set(draft, `claimEntities.payeeListMap.${payeeId || id}`, {
        ...payeeItem,
        payeeType: relationshipWithInsuredForHK.self,
        ...payeeItemData,
        paymentMethod: '',
        accountHolder: '',
        paymentType: payeeItem?.paymentType || PaymentType.LS,
      });
    }
  });
  return { ...nextState };
};

export default saveSelectInsuredInfo;
