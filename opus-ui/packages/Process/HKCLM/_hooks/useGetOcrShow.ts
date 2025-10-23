import { useMemo } from 'react';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';

export default ({ incidentId, incidentItem, incidentListMap, treatmentListMap }: any) => {
  return useMemo(() => {
    const incidentLength = lodash.keys(incidentListMap).length;
    const list = lodash.chain(treatmentListMap).filter({ incidentId }).value() || [];
    if (incidentLength > 1 || lodash.isEmpty(list) || lodash.size(list) > 1) return false;

    const medicalProviders = ['144', '155'];
    const claimTypeArray = formUtils.queryValue(incidentItem.claimTypeArray);

    return (
      claimTypeArray?.[0] === 'IP' &&
      (lodash.includes(medicalProviders, formUtils.queryValue(list[0]?.medicalProvider)) ||
        formUtils.queryValue(list[0]?.hospitalType) === 'G')
    );
  }, [incidentId, incidentItem, incidentListMap, treatmentListMap]);
};
