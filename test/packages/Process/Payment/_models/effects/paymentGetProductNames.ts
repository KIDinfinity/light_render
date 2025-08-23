import { getDictProduct } from '@/services/claimProductInformationControllerService';

export default function* getProductNames(_: any, { select, call, take, put }: any) {
  const { NAMESPACE } = _.payload;
  const policyBenefitList = yield select(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.paymentModal?.datas?.policyBenefitList
  );

  const currentProductNameMap = yield select(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.paymentModal?.datas?.productNameMap
  );
  const policyCoverageList = yield select(
    ({ [NAMESPACE]: modelnamespace }: any) =>
      modelnamespace?.paymentModal?.datas?.c360PolicyInfo?.policyCoverageList
  );
  if (policyBenefitList?.length && !currentProductNameMap && policyCoverageList) {
    const policyCoverageistFiltered = policyCoverageList.filter(
      (policyCoverage) =>
        policyCoverage.coverageSeq === '01' &&
        policyCoverage.riderSeq === '00' &&
        policyCoverage.lifeNumber === '01' &&
        policyBenefitList.some((benefitItem) => policyCoverage.policyId === benefitItem.policyNo)
    );
    if (policyCoverageistFiltered.length) {
      const response = yield call(
        getDictProduct,
        policyCoverageistFiltered.map((policy) => policy.productCode)
      );
      if (response?.success) {
        const productNameMap = {};
        response?.resultData.map((product) => {
          productNameMap[product?.productCode || 'noCode'] = product?.productName;
        });
        yield put({
          type: 'paymenSaveProductNameMap',
          payload: {
            productNameMap,
          },
        });
      }
    }
  }
  yield take('openDataChannel');
}
