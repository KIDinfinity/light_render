import { tenant } from '@/components/Tenant';
import { searchInfoByRegionCode } from '@/services/claimMedicalProviderInformationControllerService';
import lodash from 'lodash';
import type { ReasonGroupType } from '../../type';
const dataMapping = (
  dataList: any[],
  dictCode: string,
  dictName: string,
  extraNameFn?: (data: any) => string
) => {
  const dicts: Record<string, string> = {};
  lodash.forEach(dataList, (data: any) => {
    const dictCodeValue = data[dictCode || 'dictCode'];
    if (dictCodeValue) {
      dicts[dictCodeValue] = lodash.isFunction(extraNameFn)
        ? extraNameFn(data)
        : data[dictName || 'dictName'];
    }
  });
  return dicts;
};

function* getMedicalProviderDicts({}: any, { put, select }: any) {
  const currentReasonGroups: ReasonGroupType[] = yield select((state: any) =>
    lodash.get(state, 'envoyController.currentReasonGroups')
  );
  const historyReasonGroups: ReasonGroupType[] = yield select((state: any) =>
    lodash.get(state, 'envoyController.historyReasonGroups')
  );

  const allMedicalProviderCodes = lodash
    .chain([...currentReasonGroups, ...historyReasonGroups])
    .filter((reasonGroup) => reasonGroup.groupCode === 'P_BP_PND_MedicalRequirement')
    .map((reasonGroup) =>
      reasonGroup?.reasonDetails?.map((reasonDetail) =>
        reasonDetail?.pendingMemoList?.map((memo) => memo?.medicalProviderCode)
      )
    )
    .flattenDeep()
    .compact()
    .uniq()
    .value();

  console.log(
    '🚀 ~ function*getMedicalProviderDicts ~ allMedicalProviderCodes:',
    allMedicalProviderCodes
  );

  const regionCode = tenant.region();

  const response: {
    success?: boolean;
    resultData?: any[];
  } = yield searchInfoByRegionCode({ regionCode, codes: allMedicalProviderCodes });

  if (response && response.success && response.resultData) {
    const list = lodash.get(response, 'resultData', []);
    const dicts = dataMapping(
      list,
      'medicalProviderCode',
      'medicalProviderName',
      (data: any) =>
        `${data?.medicalProviderName}${
          data?.provinceDescription ? `, ${data?.provinceDescription}` : ''
        }`
    );
    yield put({
      type: 'setMedicalProviderDicts',
      payload: {
        medicalProviderDicts: dicts,
      },
    });
    return {};
  }
  return {};
}

export default getMedicalProviderDicts;
