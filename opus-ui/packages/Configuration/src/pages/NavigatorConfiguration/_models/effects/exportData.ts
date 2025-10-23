import type { PayProps, SagaProps } from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import { handlerSearchParams } from 'configuration/pages/ConfigurationCenter/Utils/Search';
import { exportData } from '@/services/ccBusinessDataControllerService';
import lodash from 'lodash';
import getCaseCategory from '../config/getCaseCategory';
import { formUtils } from 'basic/components/Form';

export default function* ({ payload }: PayProps, { call, select }: SagaProps) {
  const { functionData, searchDefault, functionId, functionCode } = yield select((state: any) => ({
    functionData: state.configurationController?.functionData,
    searchDefault: state.configurationController?.searchDefault,
    functionId: state.configurationController?.currentMenu?.id,
    functionCode: state.configurationController?.currentMenu?.functionCode,
    resetLoading: state.configurationController?.resetLoading,
  }));

  const hasParams = lodash.has(payload, 'params');
  const options = formUtils.cleanValidateData(hasParams ? payload : searchDefault);

  const newParams = handlerSearchParams(
    {
      ...options,
      functionId,
      functionCode,
      caseCategory: getCaseCategory(functionCode),
    },
    functionData
  );
  const response = yield call(exportData, newParams);
  return response;
}
