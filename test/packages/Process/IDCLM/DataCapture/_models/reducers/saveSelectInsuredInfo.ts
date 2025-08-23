import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { relationshipWithInsuredForHK } from 'claim/enum';
import { getDefaultPayeeId, saveDefaultPayee } from 'claim/pages/utils/getPayeeDefaultData';

import { getSelectInsuredInfo, getPolicyOwnerInfo } from '../functions';
import addPayeeInfoItem from './addPayeeInfoItem';

const saveSelectInsuredInfo = (state: any, action: any) => {
  const { selectColumns, skipPolicyNo = false } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const payeeListMapData = lodash.get(state, 'claimEntities.payeeListMap');

    const { searchInsuredObj } = draftState;
    const insuredObj: any = formUtils.formatFlattenValue(
      formUtils.cleanValidateData(searchInsuredObj)
    );
    const payeeId = getDefaultPayeeId(payeeListMapData);

    const policyOwnerList = lodash.get(draftState, 'policyOwnerList', []);

    const newInsuredInfo = { ...getSelectInsuredInfo(selectColumns, skipPolicyNo) };
    const oldInsuredId = draftState.claimProcessData.insured.insuredId;
    const newInsuredId = newInsuredInfo.insuredId;

    const policyId = insuredObj?.policyId
      ? insuredObj?.policyId
      : lodash
          .chain(selectColumns?.policyResultList)
          .map((item) => ({
            policyId: item?.policyId,
            clientId: item?.ownerClientInfo?.clientId,
          }))
          .find({ clientId: selectColumns?.clientId })
          .get('policyId')
          .value();
    const identityType = insuredObj?.identityType
      ? insuredObj?.identityType
      : newInsuredInfo?.identityType;
    const identityNo = insuredObj?.identityNo
      ? formUtils.queryValue(searchInsuredObj?.identityNo)
      : newInsuredInfo?.identityNo;

    draftState.claimProcessData.insured = {
      ...draftState.claimProcessData.insured,
      ...newInsuredInfo,
      policyId,
      identityType,
      identityNo,
    };

    const policyOwnerInfo = getPolicyOwnerInfo(formUtils.queryValue(policyId), policyOwnerList);
    draftState.claimProcessData.claimant = {
      ...policyOwnerInfo,
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
        lodash.set(draftState, 'claimProcessData.payeeList', payeeList);
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
      lodash.set(
        draftState,
        `claimEntities.payeeListMap.${payeeId || id}`,
        saveDefaultPayee({
          ...payeeItem,
          payeeType: relationshipWithInsuredForHK.policyOwner,
          ...payeeItemData,
          paymentMethod: '',
          accountHolder: '',
        })
      );
    }
  });
  return { ...nextState };
};

export default saveSelectInsuredInfo;
