import React, { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import bpm from 'bpm/pages/OWBEntrance';
import { formUtils } from 'basic/components/Form';
import { collectSectionErrors } from 'claim/pages/Japan/ProcessOfJPCLM/JPCLMOfClaimRegistration/validators';

const EntryErrorsUpdate = () => {
  const submited = useSelector((state: any) => state.formCommonController.submited);
  const { claimEntities, claimProcessData } = useSelector(
    (state: any) => state.JPCLMOfClaimRegistrationController
  );
  const menuCreateErrors = useSelector((state: any) => state.menuCreateCaseClaim.errors);
  const errors = useMemo(() => {
    let claimErrors = [];
    let sectionErrors = [];
    if (submited) {
      claimErrors = formUtils.getErrorArray({ claimProcessData, claimEntities });
      sectionErrors = collectSectionErrors(claimProcessData, claimEntities, submited);
    }

    const totalErrors = lodash.merge(sectionErrors, menuCreateErrors, claimErrors);
    return totalErrors;
  }, [claimEntities, menuCreateErrors]);
  bpm.setClaimDataSelector(
    (state: any) => state.JPCLMOfClaimRegistrationController.claimProcessData
  );
  bpm.updateErrors({ errors });
  return <></>;
};

export default EntryErrorsUpdate;
