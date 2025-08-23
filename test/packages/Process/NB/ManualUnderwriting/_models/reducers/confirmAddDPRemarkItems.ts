import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    const productCode = formUtils.queryValue(state?.addDPRemarkSelectedProduct?.productName);
    const insuredName = formUtils.queryValue(state?.addDPRemarkSelectedProduct?.name);
    const addDPRemarkItems = state.addDPRemarkItems || [];
    const coverageList = lodash.get(state, 'businessData.policyList[0].coverageList', []);

    const index = lodash
      .chain(coverageList)
      .findIndex((c) => {
        const matchClient = lodash
          .chain(c)
          .get('coverageInsuredList', [])
          .some((insured: any) => insured?.clientId === insuredName)
          .value();
        return c.productCode === productCode && matchClient;
      })
      .value();
    const coverageRemarkList =
      lodash
        .chain(coverageList)
        .findIndex((c) => {
          const matchClient = lodash
            .chain(c)
            .get('coverageInsuredList', [])
            .some((insured: any) => insured?.clientId === insuredName)
            .value();
          return c.productCode === productCode && matchClient;
        })
        .get('coverageRemarkList')
        .value() || [];

    lodash.set(draftState, `businessData.policyList[0].coverageList[${index}].coverageRemarkList`, [
      ...coverageRemarkList,
      ...addDPRemarkItems,
    ]);

    lodash.set(draftState, 'addDPRemarkItems', []);
    lodash.set(draftState, 'addDPRemarkSelectedProduct', {});
  });
  return { ...nextState };
};
