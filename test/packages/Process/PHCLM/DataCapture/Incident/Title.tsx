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
        // prefix={
        //   <div className={styles.errorTooltipWrapper}>
        //     {showOutPatientHint && submited && (
        //       <ErrorTooltipManual manualErrorMessage="[treatment] should at least have one outPatient treatment record when claimType contain outPatient." />
        //     )}
        //     {showInPatientHint && submited && (
        //       <ErrorTooltipManual manualErrorMessage="[treatment] should at least have one inPatient treatment record when claimType contain inPatient." />
        //     )}
        //   </div>
        // }
        suffix={` No. ${incidentItem.incidentNo}`}
      />
    </div>
  );
};

export default Title;
