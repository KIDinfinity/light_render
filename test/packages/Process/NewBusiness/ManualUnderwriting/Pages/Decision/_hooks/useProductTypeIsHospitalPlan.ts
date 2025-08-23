import { useMemo } from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import useGetCoverageList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageList';
import Mode from 'process/NewBusiness/ManualUnderwriting/_enum/Mode';
import ProductType from 'process/NewBusiness/ManualUnderwriting/_enum/ProductType';
const targetProductType = [ProductType.ILP, ProductType.RT, ProductType.AT];

export default ({ id }: any) => {
  const coverageList = useGetCoverageList(Mode.Edit);

  return useMemo(() => {
    const currentProductType = formUtils.queryValue(
      lodash
        .chain(coverageList)
        .find((item) => item.id === id)
        .get('productType')
        .value()
    );
    return lodash.includes(targetProductType, currentProductType);
  }, [coverageList, id]);
};
