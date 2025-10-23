import services from '@/services/bpmBusinessProcessService';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';

export default function* saveBusinessProcess({ payload }: any, { call, select }: any) {
  const { selectColumns, partyId } = payload;
  const searchInsuredObj = yield select(
    (state: any) => state.opusClaimDataCapture?.searchInsuredObj
  );
  const processInstanceId = yield select(
    (state: any) => state.processTask?.getTask?.processInstanceId
  );
  const policyNo = formUtils.queryValue(searchInsuredObj?.policyId);
  const firstName = selectColumns?.firstName ?? '';
  const surname = selectColumns?.surname ?? '';
  const insured = lodash.trim(`${firstName} ${surname}`);
  const currentPolicy = lodash.find(selectColumns?.policyResultList, { policyId: policyNo });
  const policyOwnerName = currentPolicy
    ? lodash.trim(
        `${currentPolicy.ownerClientInfo?.firstName || ''} ${currentPolicy.ownerClientInfo?.surname || ''}`
      )
    : '';
  const extra = policyOwnerName ? { policyOwnerName } : {};
  const params = {
    insured,
    policyNo,
    processInstanceId,
    partyId,
    ...extra,
  };

  yield call(services.saveBusinessProcess, params);
}
