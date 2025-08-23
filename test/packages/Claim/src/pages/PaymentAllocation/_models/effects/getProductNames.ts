import { getDictProduct } from '@/services/claimProductInformationControllerService';


export default function* getProductNames(_: any, { select, call, take, put }: any) {
  const policyBenefitList = yield select(({ paymentAllocation }: any) => paymentAllocation.claimData?.policyBenefitList);

  const currentProductNameMap = yield select(({ paymentAllocation }: any) => paymentAllocation.claimData?.productNameMap);
  const policyCoverageList = yield select(({ paymentAllocation }: any) => paymentAllocation.claimData?.c360PolicyInfo?.policyCoverageList)
  if(policyBenefitList?.length && !currentProductNameMap && policyCoverageList) {
    const policyCoverageistFiltered = policyCoverageList.filter(policyCoverage =>
      policyCoverage.coverageSeq === '01' &&
      policyCoverage.riderSeq === '00' &&
      policyCoverage.lifeNumber === '01' &&
      policyBenefitList.some(benefitItem => policyCoverage.policyId === benefitItem.policyNo))
    if(policyCoverageistFiltered.length) {
      const response = yield call(getDictProduct, policyCoverageistFiltered.map(policy => policy.productCode));
      if(response?.success) {
        const productNameMap = {};
        response?.resultData.map(product => {
          productNameMap[product?.productCode || 'noCode'] = product?.productName
        })
        yield put({
          type: 'saveProductNameMap',
          payload: {
            productNameMap
          },
        });
      }
    }
  }
  yield take('openDataChannel');
}
