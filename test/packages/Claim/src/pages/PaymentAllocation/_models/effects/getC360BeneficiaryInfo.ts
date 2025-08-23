import lodash from 'lodash';
import { loadC360BeneficiaryInfo } from '@/services/claimBeneficiaryControllerService';
import { formUtils } from 'basic/components/Form';

export default function* getC360BeneficiaryInfo({ payload }: any, { call, select }: any) {
  const { claimData = {} } = payload;
  const { taskNotEditable } = yield select(
    ({ claimEditable }: any) => claimEditable.taskNotEditable
  );

  if (taskNotEditable) return claimData?.c360BeneficiaryInfo;

  const claimDataOld: any = formUtils.formatFlattenValue(formUtils.cleanValidateData(claimData));

  const response = yield call(loadC360BeneficiaryInfo, claimDataOld);
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);

  if (success && resultData) {
    return resultData;
  }

  return {};
}
