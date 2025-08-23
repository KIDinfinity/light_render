import { useMemo } from 'react';
import useGetCoverageList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageList';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default ({ coverageId }: any) => {
  const coverageList = useGetCoverageList('edit');

  return useMemo(() => {
    const insueds = lodash
      .chain(coverageList)
      .find((coverage: any) => coverage.id === coverageId)
      .get('coverageInsuredList', [])
      .map((insured: any) => formUtils.queryValue(insured?.clientId))
      .value();

    return lodash
      .chain(insueds)
      .some((insuredId: any) => {
        return lodash
          .chain(coverageList)
          .some((coverage: any) => {
            return (
              coverage?.isMain === 'Y' &&
              lodash.some(coverage?.coverageInsuredList, (insuedItem: any) => {
                return formUtils.queryValue(insuedItem.clientId) === insuredId;
              })
            );
          })
          .value();
      })
      .value();
  }, [coverageList, coverageId]);
};
