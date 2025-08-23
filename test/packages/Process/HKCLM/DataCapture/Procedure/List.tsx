import React from 'react';
import { NAMESPACE } from '../activity.config';

import { useSelector } from 'dva';
import lodash from 'lodash';
import { FormTitleCard, formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import getOrderByProcedureList from 'claim/utils/getOrderByProcedureList';

import ListItem from './ListItem';
import OtherProcedureList from '../OtherProcedure';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import { ClaimType } from 'claim/enum';
import ListItemICU from './ListItemICU';
import Add from './Add';
import styles from './ProcedureList.less';

const ProcedureList = ({ treatmentId, incidentId }: any) => {
  const procedureList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.treatmentListMap[treatmentId]?.procedureList
  );
  const treatmentList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.treatmentListMap[treatmentId]
  );

  const procedureListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities?.procedureListMap
  );
  const nowProcedureList = getOrderByProcedureList(procedureListMap, procedureList);
  const treatmentTypeOP = formUtils.queryValue(treatmentList?.treatmentType) === ClaimType.OPD;
  const therapiesType = formUtils.queryValue(treatmentList?.therapiesType);
  const icu = formUtils.queryValue(treatmentList?.icu);
  const Therapies = formUtils.queryValue(treatmentList?.therapiesType);

  return (
    <>
      <div className={styles.procedureCard}>
        <FormTitleCard
          className={styles.title}
          title={
            <>
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
            </>
          }
        >
          {(!!icu || !!Therapies) && (
            <ListItemICU incidentId={incidentId} treatmentId={treatmentId} />
          )}
          {lodash.compact(nowProcedureList).map((item: any) => (
            <ListItem
              incidentId={incidentId}
              treatmentId={treatmentId}
              procedureId={item}
              key={item}
            />
          ))}
          <OtherProcedureList treatmentId={treatmentId} />
          <Add incidentId={incidentId} treatmentId={treatmentId} />
        </FormTitleCard>
      </div>
    </>
  );
};

export default ProcedureList;
