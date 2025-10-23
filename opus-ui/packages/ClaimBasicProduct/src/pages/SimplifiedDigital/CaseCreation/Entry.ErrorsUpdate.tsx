import React, { useMemo } from 'react';
import { useSelector } from 'dva';
import { denormalizeClaimData } from '@/utils/claimUtils';
import { formUtils } from 'basic/components/Form';
import bpm from 'bpm/pages/OWBEntrance';

const EntryErrorsUpdate = () => {
  const {
    pageData,
    dataEntities,
    submited,
  } = useSelector((state: any) => ({
    pageData: state.simplifiedDigitalController.pageData,
    dataEntities: state.simplifiedDigitalController.dataEntities,
    submited: state.formCommonController.submited,
  }));
  const denormalizedData = denormalizeClaimData(pageData, dataEntities);

  const errors = useMemo(() => {
    const formErrors = formUtils.getErrorArray(denormalizedData);
    return [
      ...formErrors,
    ];
  }, [
    pageData,
    dataEntities,
    submited,
  ]);

  bpm.updateErrors({ errors });
  return <></>;
};

export default EntryErrorsUpdate;
