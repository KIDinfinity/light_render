import type Region from 'enum/Region';
import { listConfigs } from '@/services/miscPageAtomConfigControllerService';
import { SS, SSKey } from '@/utils/cache';
import isOpus from '@/utils/isOpus';

import getCommonCaseCategoryAndActivityCode from 'basic/components/Elements/getCommonCaseCategoryAndActivityCode';

interface IParams {
  payload: {
    caseCategory: string;
    activityCode: string;
  };
}

export default function* (
  { payload }: IParams,
  { put, call, select }: any
): Generator<any, void, any> {
  const region: Region = SS.getItem(SSKey.CONFIGS)?.region;
  const opusSite = isOpus();
  const { caseCategory, activityCode } = payload || {};

  const prevResult = yield select(
    (state: any) => state.atomConfig.sections?.[`${caseCategory}_${activityCode}`]
  );
  if (prevResult) {
    yield put({
      type: 'setSection',
      payload: {
        key: `${caseCategory}_${activityCode}`,
      },
    });
    return; // 如果已经加载过了，就不再加载
  }
  const params = getCommonCaseCategoryAndActivityCode({ caseCategory, activityCode });

  const response = yield call(listConfigs, {
    regionCode: opusSite ? `${region}_OPUS` : region,
    caseCategory: params?.caseCategory,
    activityCode: params?.activityCode,
  });

  if (response?.success && response?.resultData) {
    yield put({
      type: 'setSection',
      payload: {
        key: `${caseCategory}_${activityCode}`,
        result: response.resultData,
      },
    });
  }
}
