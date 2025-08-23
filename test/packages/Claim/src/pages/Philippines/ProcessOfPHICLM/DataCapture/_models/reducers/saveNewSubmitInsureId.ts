import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import {
  calculateDate,
  getPolicyInfoByInsuredId,
  getPolicyOwnerInfo,
  getSelectInsuredInfo,
  getClientInfoByPolicyId,
} from '../functions';

const saveNewSubmitInsureId = (state: any, action: any) => {
  const { selectColumns, skipPolicyNo = false } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    let newInsuredInfo: any = {};
    if (lodash.isArray(selectColumns?.policyIdList)) {
      newInsuredInfo = { ...getSelectInsuredInfo(selectColumns, skipPolicyNo) };
    } else {
      newInsuredInfo = { ...getPolicyOwnerInfo(selectColumns) };
    }

    const { policyId } = skipPolicyNo ? draftState.claimProcessData.insured : newInsuredInfo;

    const submissionDate = formUtils.queryValue(draftState.claimProcessData.submissionDate);
    const presentAge = calculateDate(
      submissionDate,
      formUtils.queryValue(newInsuredInfo.dateOfBirth)
    );
    const { policyList } = draftState.claimProcessData;
    const insuredInfo = {
      policyId,
    };
    const policyInfoList = getPolicyInfoByInsuredId(policyList, insuredInfo);
    const effectiveDate = policyInfoList?.issueEffectiveDate;
    const issueAge = calculateDate(effectiveDate, formUtils.queryValue(newInsuredInfo.dateOfBirth));

    const policyOwnerList = lodash.get(draftState, `claimProcessData.policyOwnerList`, []);
    const clientInfoList = lodash.get(draftState, `claimProcessData.clientInfoList`, []);
    const policyClientInfo = getClientInfoByPolicyId({
      policyOwnerList,
      clientInfoList,
      policyId: formUtils.queryValue(policyId),
    });
    const { address, representative, position } = lodash.pick(policyClientInfo, [
      'address',
      'representative',
      'position',
    ]);

    newInsuredInfo.issueAge = issueAge;
    newInsuredInfo.presentAge = presentAge;
    newInsuredInfo.insuredId = newInsuredInfo?.clientId;
    newInsuredInfo.companyAddress = address;
    newInsuredInfo.companyRepresentative = representative;
    newInsuredInfo.position = position;

    draftState.claimProcessData.insured = {
      ...draftState.claimProcessData.insured,
      ...newInsuredInfo,
    };
    draftState.claimProcessData.claimant = {};
  });
  return { ...nextState };
};

export default saveNewSubmitInsureId;
