import services from '@/services/bpmBusinessProcessService';
import lodash from 'lodash';

export default function* saveBusinessProcess({ payload }: any, { call, select }: any) {
  const { selectColumns } = payload;

  const processInstanceId = yield select(
    (state: any) => state.processTask?.getTask?.processInstanceId
  );

  const {
    policyId: policyNo,
    insuredClientInfo: { firstName = '', surname = '' },
    ownerClientInfo: { firstName: owerFirstName = '', surname: owerSurname = '' },
  } = selectColumns || {};

  const insured = lodash.trim(`${firstName} ${surname}`);

  const policyOwnerName = lodash.trim(`${owerFirstName} ${owerSurname}`);
  const extra = policyOwnerName ? { policyOwnerName } : {};
  const params = {
    insured,
    policyNo,
    processInstanceId,
    ...extra,
  };

  yield call(services.saveBusinessProcess, params);
}
