import React, { useMemo } from 'react';
import { NAMESPACE } from '../activity.config';

import { useSelector } from 'dva';
import rulesOfDataCaptrue from '@/utils/rulesOfDataCaptrue';
import { SectionTitle } from './Section';

const Title = ({ incidentId }: any) => {
  const incidentItem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.incidentListMap?.[incidentId]
  );
  const treatmentListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities.treatmentListMap
  );
  const submited = useSelector(({ formCommonController }: any) => formCommonController.submited);
  const { showOutPatientHint, showInPatientHint } = useMemo(() => {
    return {
      showOutPatientHint:
        !rulesOfDataCaptrue.checkTreatmentTypeOK(incidentItem, 'OP', treatmentListMap).isOK ===
        true,
      showInPatientHint:
        !rulesOfDataCaptrue.checkTreatmentTypeOK(incidentItem, 'IP', treatmentListMap).isOK ===
        true,
    };
  }, [treatmentListMap, incidentItem]);

  return (
    <div>
      <SectionTitle
        suffix={` No. ${incidentItem?.incidentNo || 1}`}
      />
    </div>
  );
};

export default Title;
