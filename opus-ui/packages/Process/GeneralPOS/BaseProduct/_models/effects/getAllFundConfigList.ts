import { getFundList } from '@/services/miscCfgInquiryControllerService';
import { NAMESPACE } from '../../activity.config';
import lodash from 'lodash';
import { tenant, Region } from '@/components/Tenant';

export default function* ({ payload }: any, { select, call, put }: any) {
  const mainPolicyId = lodash.get(payload, 'mainPolicyId');

  const policyInfo = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.policyInfo
  );
  const policyFundDOList = policyInfo?.policyFundDOList?.map((item) => item?.fundCode) || [];
  let companyCode = lodash
    .chain(policyInfo?.policyInfoList)
    .find((item) => item.policyId === mainPolicyId)
    .get('companyCode')
    .value();
  if (!companyCode) {
    companyCode = policyInfo?.mainCompanyCode;
  }
  const res = yield call(
    getFundList,
    tenant.region() === Region.MY
      ? {transactionType:payload?.transactionTypeCode, policyCoverageList: policyInfo?.policyCoverageList?.filter((i) => i.policyId == mainPolicyId) || [] }
      : { companyCode: companyCode || '' }
  ) || [];
  if (lodash.hasIn(res, 'success') && !res.success) {
    return;
  }
  yield put({
    type: 'setAllFundConfigList',
    payload: {
      allFundConfigList: lodash
        .uniqBy(
          res?.resultData?.map((item) => ({
            dictCode: item.fundCode,
            dictName: tenant.isTH()
              ? item?.amcFundCode
                ? `${item.fundCode} - ${item?.amcFundCode}`
                : item.fundCode
              : `${item.fundCode} - ${item.fundName}`,
            ...item,
          })),
          'dictCode'
        )
        .filter((item) => item?.fundStatus === 'OS' || policyFundDOList.includes(item?.dictCode)),
      allFundConfigListMap: res.resultData?.reduce((r, c) => {
        r[c.fundCode] = c;
        return r;
      }, {}),
    },
  });
}
