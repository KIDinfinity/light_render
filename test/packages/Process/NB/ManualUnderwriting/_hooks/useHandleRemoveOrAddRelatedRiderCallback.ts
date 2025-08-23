import { useCallback } from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { useSelector,  useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useGetCoverageList from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageList';
import getRelatedRider from 'process/NB/ManualUnderwriting/utils/getRelatedRider';
import useHandleRemoveCoverageCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleRemoveCoverageCallback';
import useHandleAddRiderCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleAddRiderCallback';

export default ({ id }: any) => {
  const dispatch = useDispatch();
  const removeRider = useHandleRemoveCoverageCallback({ id });
  const handleAddRider = useHandleAddRiderCallback();
  const coverageList = useGetCoverageList();
  const planProductConfig = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.planProductConfig,
    shallowEqual
  );
  return useCallback(
    (coreCode: any) => {
      const targetCoverageProductBeforeChange = formUtils.queryValue(
        lodash
          .chain(coverageList)
          .find((coverage: any) => coverage.id === id)
          .get('coreCode')
          .value()
      );
      const productCodes = lodash.map(coverageList, (coverageItem: any) => {
        if (coverageItem.id === id) {
          return coreCode;
        }
        return formUtils.queryValue(coverageItem.coreCode);
      });

      const relatedRider = getRelatedRider({ productCodes, planProductConfig });
      const riderNeedToRemove = (() => {
        return lodash
          .chain(
            getRelatedRider({
              productCodes: [targetCoverageProductBeforeChange],
              planProductConfig,
            })
          )
          .filter((riderItem: any) => {
            return !lodash
              .chain(relatedRider)
              .map((rider: any) => rider.productCode)
              .includes(riderItem.productCode)
              .value();
          })
          .map((riderItem: any) => riderItem.productCode)
          .value();
      })();
      lodash.forEach(coverageList, (coverage: any) => {
        if (lodash.includes(riderNeedToRemove, formUtils.queryValue(coverage?.coreCode))) {
          dispatch({
            type: `${NAMESPACE}/deleteRider`,
            payload: {
              id: coverage?.id,
            },
          });
        }
      });
    },
    [coverageList, id, planProductConfig, removeRider, handleAddRider]
  );
};
