import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import useGetBasicProductData from 'process/NB/ManualUnderwriting/_hooks/useGetBasicProductData';

export default () => {
  const basicProduct = useGetBasicProductData();
  return formUtils.queryValue(lodash.get(basicProduct, 'coreCode'));
};
