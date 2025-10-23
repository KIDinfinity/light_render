import lodash from 'lodash';

interface IPropsFilterData {
  filterName: any;
  params: any;
  extraScreen?: Object;
}
export default ({ filterName, params, extraScreen }: IPropsFilterData) => {
  const { productCode, policyNo, benefitTypeCode, incidentId } = params?.extra || {};

  return (
    lodash.find(lodash.values(filterName) || [], {
      incidentId,
      productCode,
      policyNo,
      benefitTypeCode,
      ...extraScreen,
    }) || {}
  );
};
