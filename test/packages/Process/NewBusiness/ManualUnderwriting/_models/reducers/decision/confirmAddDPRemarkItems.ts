import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    const productCode = formUtils.queryValue(state?.addDPRemarkSelectedProduct?.productName);
    const insuredName = formUtils.queryValue(state?.addDPRemarkSelectedProduct?.name);
    const addDPRemarkItems = draftState.addDPRemarkItems || [];
    const coverageList = lodash.get(draftState, 'processData.coverageList', []);
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
    const coverageRemarkList = lodash.get(draftState, `processData.coverageList[${index}].coverageRemarkList`, []) || [];
    lodash.set(draftState, `processData.coverageList[${index}].coverageRemarkList`, [
      ...coverageRemarkList,
      ...addDPRemarkItems,
    ]);

    lodash.set(draftState, 'addDPRemarkItems', []);
    lodash.set(draftState, 'addDPRemarkSelectedProduct', {});
  });
  return { ...nextState };
};
