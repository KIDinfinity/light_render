import React from 'react';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { formUtils } from 'basic/components/Form';
import _ from 'lodash';
import useGetProductionAndRider from './useGetProductionAndRider';

export default ({ id }: { id: string }): boolean => {
  const productList = useGetProductionAndRider();
  const coverageList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.coverageList,
    shallowEqual
  );

  return React.useMemo(() => {
    const productCode = formUtils.queryValue(
      _.chain(coverageList)
        .find((item: { id: string }) => item?.id === id)
        .get('coreCode')
        .value()
    );

    const editInd = _.chain(productList)
      .find((item: { productCode: string }) => item.productCode === productCode)
      .get('underwritingDecisionEditInd')
      .isEqual('N')
      .value();

    return editInd;
  }, [coverageList, productList, id]);
};
