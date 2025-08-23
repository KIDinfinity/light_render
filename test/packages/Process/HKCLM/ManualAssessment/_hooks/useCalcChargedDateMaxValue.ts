import { useMemo } from 'react';
import lodash from 'lodash';
import moment from 'moment';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/HKCLM/ManualAssessment/activity.config';
import { formUtils } from 'basic/components/Form';

export default ({ treatmentId }: any) => {
  const treatment = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.treatmentListMap[treatmentId],
    shallowEqual
  );
  return useMemo(() => {
    const { dateOfDischarge, dateOfAdmission } = lodash.pick(treatment, [
      'dateOfDischarge',
      'dateOfAdmission',
    ]);

    return (() => {
      const diff = lodash.toNumber(
        moment(formUtils.queryValue(dateOfDischarge)).diff(
          formUtils.queryValue(dateOfAdmission),
          'days'
        )
      );
      return lodash.max([(lodash.isNaN(diff) ? 0 : diff) + 1, 0]);
    })();
  }, [treatment]);
};
