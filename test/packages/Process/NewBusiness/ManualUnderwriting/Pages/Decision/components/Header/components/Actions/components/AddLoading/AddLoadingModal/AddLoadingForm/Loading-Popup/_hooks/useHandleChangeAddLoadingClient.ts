import { useCallback } from 'react';
import lodash from 'lodash';
import { useDispatch, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import useGetCoverageList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageList.ts';
import { formUtils } from 'basic/components/Form';

export default () => {
  const dispatch = useDispatch();
  const addingLoadingItems = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.addingLoadingItems,
    shallowEqual
  );
  const addingLoadingSelectedProduct = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.addingLoadingSelectedProduct,
    shallowEqual
  );
  const coverageList = useGetCoverageList();
  return useCallback(
    (name) => {
      const targetField = [
        {
          key: 'pmPeriod',
          relateKey: 'pmLoading',
        },
        {
          key: 'fmPeriod',
          relateKey: 'flatMortality',
        },
      ];
      const selectedProduct = formUtils.queryValue(addingLoadingSelectedProduct?.productName);
      const policyTerm = lodash
        .chain(coverageList)
        .find((coverage: any) => {
          const matachInsured = (() => {
            if (
              name &&
              lodash
                .chain(coverage)
                .get('coverageInsuredList')
                .some((insureItem: any) => insureItem.clientId === name)
                .value()
            ) {
              return true;
            }
            if (!name) {
              return true;
            }
            return false;
          })();
          return lodash.includes(selectedProduct, coverage.productCode) && matachInsured;
        })
        .get('payPeriod')
        .value();
      lodash
        .chain(addingLoadingItems)
        .forEach((item) => {
          lodash
            .chain(item)
            .entries()
            .forEach(([key]) => {
              const relateKey = lodash
                .chain(targetField)
                .find((fieldItem: any) => fieldItem.key === key)
                .get('relateKey')
                .value();
              const relateValue = formUtils.queryValue(lodash.get(item, relateKey));
              if (
                lodash
                  .chain(targetField)
                  .map((fieldItem: any) => fieldItem.key)
                  .includes(key)
                  .value() &&
                policyTerm &&
                relateValue
              ) {
                dispatch({
                  type: `${NAMESPACE}/handleChangeAddingLoadingItem`,
                  payload: {
                    changedFields: {
                      [key]: policyTerm,
                    },
                    id: item?.id,
                  },
                });
              }
            })
            .value();
        })
        .value();
    },
    [dispatch, addingLoadingItems, coverageList, addingLoadingSelectedProduct]
  );
};
