import React from 'react';
import { NAMESPACE } from '../activity.config';

import { useSelector } from 'dva';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import getOrderByProcedureList from 'claim/utils/getOrderByProcedureList';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import { ClaimType } from 'claim/enum';
import ProcedureItem from './Item';
import Add from './Add';
import ListItemICU from './ListItemICU';
import ListItemMainBenifit from './ListItemMainBenifit';
import styles from './ProcedureList.less';

const ProcedureList = ({ treatmentId, incidentId }: any) => {
  const mainBenefitList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.treatmentListMap[treatmentId]?.mainBenefitList
  );
  const procedureList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.treatmentListMap?.[treatmentId]?.procedureList
  );

  const treatmentList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.treatmentListMap[treatmentId]
  );
  const procedureListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities?.procedureListMap
  );
  const nowProcedureList = getOrderByProcedureList(procedureListMap, procedureList);
  const treatmentTypeOP = formUtils.queryValue(treatmentList?.treatmentType) === ClaimType.OPD;
  const therapiesType = formUtils.queryValue(treatmentList?.therapiesType);
  const icu = formUtils.queryValue(treatmentList?.icu);

  return (
    <div className={styles.list}>
      <div className={styles.title}>
        {formatMessageApi({
          Label_BIZ_Claim: 'Therapies',
        })}
        {treatmentTypeOP && therapiesType && (
          <ErrorTooltipManual
            manualErrorMessage={formatMessageApi({
              Label_COM_WarningMessage: 'MSG_000517',
            })}
          />
        )}
      </div>
      {lodash.map(lodash.compact(mainBenefitList), (item: any) => (
        <ListItemMainBenifit
          incidentId={incidentId}
          treatmentId={treatmentId}
          mainBenefitId={item}
          key={item}
        />
      ))}
      {(!!icu || !!therapiesType) && (
        <ListItemICU incidentId={incidentId} treatmentId={treatmentId} />
      )}
      {lodash.map(nowProcedureList, (item, index) => (
        <ProcedureItem
          procedureId={item}
          key={item}
          index={index}
          incidentId={incidentId}
          treatmentId={treatmentId}
        />
      ))}
      <Add treatmentId={treatmentId} />
    </div>
  );
};

export default ProcedureList;
