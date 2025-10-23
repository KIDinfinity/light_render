import React, { useMemo } from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import bpm from 'bpm/pages/OWBEntrance';
import { Selection, NbClientTag } from './Enum';
import { NAMESPACE } from './activity.config';

const EntryErrorsUpdate = () => {
  const claimProcessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData
  );

  const allErrors = useMemo(() => {
    let totalErrors: any = [];
    lodash.forEach(claimProcessData?.policyList, (policyItem: any) => {
      const errors = lodash.filter(policyItem.clientInfoList, (item: any) => {
        const showCard = lodash
          .chain(item)
          .get('roleList')
          .some((v: any) => !!v?.display)
          .value();
        const suspectSelect = lodash.every(
          item.identificationList,
          (subItem: any) =>
            subItem.selection !== Selection.Y && subItem?.clientTag === NbClientTag.SuspectClient
        );
        return showCard && suspectSelect && item.newClientFlag !== Selection.Y;
      });
      totalErrors = [...totalErrors, ...errors];
    });
    return totalErrors;
  }, [claimProcessData]);

  bpm.updateErrors({
    errors: allErrors,
  });
  return <></>;
};
export default EntryErrorsUpdate;
