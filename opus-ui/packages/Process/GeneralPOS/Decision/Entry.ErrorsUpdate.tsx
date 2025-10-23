import React, { useMemo } from 'react';
import { useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import bpm from 'bpm/pages/OWBEntrance';
import { sectionErrors } from './validators';
import { denormalizeData } from './utils/normalizrUtils';
import { NAMESPACE } from './activity.config';

const EntryErrorsUpdate = () => {
  const processData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData
  );
  const entities = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.entities);
  const submited = useSelector(({ formCommonController }: any) => formCommonController.submited);
  const menuCreateErrors = useSelector(
    ({ menuCreateCaseClaim }: any) => menuCreateCaseClaim.errors
  );

  const errors = useMemo(() => {
    const denormalizedData = denormalizeData(processData, entities);
    const formErrors = formUtils.getErrorArray(denormalizedData);
    const claimData = formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData));
    const collectSectionErrors = sectionErrors(claimData, submited, entities);
    return [...formErrors, ...collectSectionErrors, ...menuCreateErrors];
  }, [processData, submited, menuCreateErrors, entities]);
  bpm.updateErrors({ errors });

  return <></>;
};

export default EntryErrorsUpdate;
