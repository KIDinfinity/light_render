import React, { useMemo } from 'react';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import { useSelector } from 'dva';
import bpm from 'bpm/pages/OWBEntrance';
import { validateResume } from './validation';

const EntryErrorsUpdate = () => {
  const { claimEntities, claimProcessData, submited } = useSelector((state) => ({
    ...lodash.pick(state?.UnknownDocumentController, ['claimEntities', 'claimProcessData']),
    submited: state.formCommonController.submited,
  }));

  const { claimHistorySearchResultRowKeys, decision } = claimProcessData;
  const errors = useMemo(() => {
    const fieldErrors = formUtils.getErrorArray(claimProcessData);
    const otherErrors = validateResume(decision, claimHistorySearchResultRowKeys);
    if (otherErrors) {
      fieldErrors.push({});
    }
    return fieldErrors;
  }, [submited, claimEntities]);
  bpm.updateErrors({ errors });

  return <></>;
};

export default EntryErrorsUpdate;
