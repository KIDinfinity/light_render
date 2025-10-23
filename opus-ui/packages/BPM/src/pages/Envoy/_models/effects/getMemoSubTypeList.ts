import envoyMemoControllerService from '@/services/envoyMemoControllerService';
import lodash from 'lodash';
import { tenant } from '@/components/Tenant';

function getNumber(str: string) {
  return Number(str.match(/[0-9]+/g));
}

function* getMemoSubTypeList({ payload }: any, { select, call, put }: any) {
  const { reasonCode, memoCode, memoSubTypeCodes } = payload;

  const response = tenant.isTH()
    ? yield call(envoyMemoControllerService.getMemoSubTypeListV2, {
        memoSubTypeCodeList: memoSubTypeCodes || [],
        memoCode,
        reasonCode,
      })
    : yield call(envoyMemoControllerService.getMemoSubTypeList, memoSubTypeCodes || []);

  const memoSubTypeList = yield select((state: any) => state.envoyController.memoSubTypeList);

  if (response && response.success) {
    const newMemoSubTypeList = lodash.filter(
      response?.resultData,
      (item) => item.memoCode === memoCode
    );

    yield put({
      type: 'saveMemoSubTypeList',
      payload: {
        memoSubTypeList: {
          ...memoSubTypeList,
          [`${reasonCode}_${memoCode}`]: newMemoSubTypeList,
        },
      },
    });

    return newMemoSubTypeList;
  }

  return [];
}

export default getMemoSubTypeList;
