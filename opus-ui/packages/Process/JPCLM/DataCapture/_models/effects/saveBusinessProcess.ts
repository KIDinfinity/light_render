import services from '@/services/bpmBusinessProcessService';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';

export default function* saveBusinessProcess({ payload }: any, { call, select }: any) {
  const { selectColumns } = payload;
  const searchInsuredObj = yield select((state: any) => state.JPCLMOfDataCapture?.searchInsuredObj);
  const processInstanceId = yield select(
    (state: any) => state.processTask?.getTask?.processInstanceId
  );
  const policyNo = formUtils.queryValue(searchInsuredObj?.policyId);
  const firstName = selectColumns?.firstName ?? '';
  const surname = selectColumns?.surname ?? '';
  const insured = lodash.trim(`${firstName} ${surname}`);
  const params = {
    insured,
    policyNo,
    processInstanceId,
  };

  yield call(services.saveBusinessProcess, params);
}
