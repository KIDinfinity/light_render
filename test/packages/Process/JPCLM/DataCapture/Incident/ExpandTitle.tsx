import React, { useMemo } from 'react';
import { useSelector } from 'dva';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import rulesOfDataCaptrue from '@/utils/rulesOfDataCaptrue';
import { SectionTitle } from './Section';

import styles from './Item.less';

const ExpandTitle = ({ incidentItem }: any) => {
  const submited = useSelector(({ JPCLMOfDataCapture }: any) => JPCLMOfDataCapture.submited);

  const { showOutPatientHint, showInPatientHint } = useMemo(() => {
    return {
      showOutPatientHint: !rulesOfDataCaptrue.calcTreatmentTypeOK(incidentItem, 'OP').isOK === true,
      showInPatientHint: !rulesOfDataCaptrue.calcTreatmentTypeOK(incidentItem, 'IP').isOK === true,
    };
  }, [incidentItem]);

  return (
    <SectionTitle
      prefix={
        <div className={styles.errorTooltipWrapper}>
          {showOutPatientHint && submited && (
            <ErrorTooltipManual manualErrorMessage="[treatment] should at least have one outPatient treatment record when claimType contain outPatient." />
          )}
          {showInPatientHint && submited && (
            <ErrorTooltipManual manualErrorMessage="[treatment] should at least have one inPatient treatment record when claimType contain inPatient." />
          )}
        </div>
      }
      suffix={` No. ${incidentItem.incidentNo}`}
    />
  );
};

export default ExpandTitle;
