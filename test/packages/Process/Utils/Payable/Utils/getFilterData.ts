import lodash from 'lodash';

interface IPropsFilterData {
  filterName: any;
  params: any;
  extraScreen?: Object;
}
export default ({ filterName, params, extraScreen }: IPropsFilterData) => {
  const { incidentId, extra } = params;
  const { productCode, policyNo, benefitTypeCode } = extra;

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
