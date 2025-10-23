import lodash from 'lodash';
import { trySustainabilityCalculate } from '@/services/owbNbProposalControllerService';
import { handleErrorMessageIgnoreXErrorNotice } from '@/utils/commonMessage';

export default function* (_: any, { call, put, select }: any) {
  const possibleSusOptNamesSelected = yield select(
    (state) => state?.manualUnderwriting?.possibleSusOptNamesSelected
  );
  const sustainabilityCheckingData = yield select(
    (state) => state?.manualUnderwriting?.sustainabilityCheckingData
  );
  const customizeSusOptName = lodash.join(possibleSusOptNamesSelected, '&');
  const data = yield put.resolve({
    type: 'getDataForSubmit',
  });
  const response = yield call(trySustainabilityCalculate, {
    ...lodash.get(data, 'businessData', {}),
    reCalculateFlag: null,
    customizeSusOptName,
  });
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
  if (success && !lodash.isEmpty(resultData) && lodash.isPlainObject(resultData)) {
    const sustainabilityOptions = lodash
      .chain(sustainabilityCheckingData)
      .get('sustainabilityOptions', [])
      .union([resultData])
      .value();
    yield put.resolve({
      type: 'setSustainabilityCheckingData',
      payload: {
        sustainabilityCheckingData: {
          ...sustainabilityCheckingData,
          sustainabilityOptions,
        },
      },
    });
  }

  if (!success) {
    handleErrorMessageIgnoreXErrorNotice(response);
  }
}
