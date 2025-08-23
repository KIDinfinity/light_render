import lodash from 'lodash';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import React from 'react';
import useGetCoverageList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageList';
import { formUtils } from 'basic/components/Form';

export default (coverageId?: string) => {
  const coverageList = useGetCoverageList();
  const DPRemarkList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.DPRemarkList,
    shallowEqual
  );
  const addProduct = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.addDPRemarkSelectedProduct,
    shallowEqual
  );

  return React.useMemo(() => {
    const insuredName = formUtils.queryValue(addProduct?.name);
    if (addProduct?.productName && insuredName) {
      const currentType = lodash
        .chain(coverageList)
        .filter((item: any) =>
          lodash
            .chain(item)
            .get('coverageInsuredList', [])
            .some((insured: any) => insured?.clientId === insuredName)
            .value()
        )
        .find((item) => item.coreCode === addProduct?.productName)
        .get(`coverageDecision.uwDecision`)
        .value();
      return lodash
        .chain(DPRemarkList)
        .filter((item) => item.type === formUtils.queryValue(currentType))
        .map((item: any) => {
          return {
            dictCode: item?.localExclusionCode,
            dictName: item?.longDesc,
          };
        })
        .value();
    } else if (coverageId) {
      const currentType = lodash
        .chain(coverageList)
        .find((item) => item.id === coverageId)
        .get(`coverageDecision.uwDecision`)
        .value();
      return lodash
        .chain(DPRemarkList)
        .filter((item) => item.type === formUtils.queryValue(currentType))
        .map((item: any) => {
          return {
            dictCode: item?.localExclusionCode,
            dictName: item?.longDesc,
          };
        })
        .value();
    }
    return lodash.map(DPRemarkList, (item: any) => {
      return {
        dictCode: item?.localExclusionCode,
        dictName: item?.longDesc,
      };
    });
  }, [addProduct?.name, addProduct?.productName, DPRemarkList, coverageId, coverageList]);
};
