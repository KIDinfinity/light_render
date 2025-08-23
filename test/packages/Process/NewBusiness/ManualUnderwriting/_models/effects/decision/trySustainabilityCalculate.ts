import lodash from 'lodash';

import { handleErrorMessageIgnoreXErrorNotice } from '@/utils/commonMessage';
import { EOptionType } from 'basic/enum/EOptionType';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default function* (_: any, { put, select }: any): Generator<any, any, any> {
  yield put({
    type: 'login/saveLoadingStatus',
    payload: {
      loadingStatus: true,
    },
  });
  const processData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData
  ) || {};
  const entities = yield select(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.entities);
  const sustainabilityModal = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.sustainabilityModal
  );

  const {
    converageListApplied: coverageList,
    sustainabilityOptions,
    possibleSusOptIdAndNameList,
    customizeSusOptIdList,
  } = lodash.pick(sustainabilityModal, [
    'converageListApplied',
    'sustainabilityOptions',
    'possibleSusOptIdAndNameList',
    'customizeSusOptIdList',
  ]);

  const businessData: any = yield put.resolve({
    type: 'getFEToBE',
    payload: {
      processData: {
        ...processData,
        coverageList,
        sustainabilityOptions,
        possibleSusOptIdAndNameList,
        customizeSusOptIdList,
      },
      entities,
    },
  });

  const response = yield put.resolve({
    type: 'getTouchResult',
    payload: {
      businessData,
      type: EOptionType.sustainabilityCalculate,
    },
  });

  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
  if (success && !lodash.isEmpty(resultData) && lodash.isPlainObject(resultData)) {
    const {
      sustainabilityOptions: newSustainabilityOptions,
      possibleSusOptIdAndNameList: newPossibleSusOptIdAndNameList,
      customizeSusOptIdList: newCustomizeSusOptIdList,
    }: any = lodash.pick(resultData?.businessData, [
      'sustainabilityOptions',
      'possibleSusOptIdAndNameList',
      'customizeSusOptIdList',
    ]);
    const newCoverageList = lodash.get(resultData, 'businessData.policyList.0.coverageList', []);
    yield put({
      type: `updateSustainability`,
      payload: {
        sustainabilityOptions: newSustainabilityOptions,
        possibleSusOptIdAndNameList: newPossibleSusOptIdAndNameList,
        customizeSusOptIdList: newCustomizeSusOptIdList,
        coverageList: newCoverageList,
      },
    });
  }

  if (!success) {
    handleErrorMessageIgnoreXErrorNotice(response);
  }

  yield put({
    type: 'login/saveLoadingStatus',
    payload: {
      loadingStatus: false,
    },
  });
}
