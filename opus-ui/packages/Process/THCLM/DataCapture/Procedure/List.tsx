import React, { useEffect } from 'react';
import { NAMESPACE } from '../activity.config';

import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import { FormTitleCard, formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import getOrderByProcedureList from 'claim/utils/getOrderByProcedureList';

import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import { ClaimType } from 'claim/enum';
import ListItem from './ListItem';
import ListItemICU from './ListItemICU';
import ListItemMainBenefit from './ListItemMainBenefit';
import Add from './Add';
import styles from './ProcedureList.less';

const ProcedureList = ({ treatmentId, incidentId }: any) => {
  const dispatch = useDispatch();
  const mainBenefitList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.treatmentListMap[treatmentId]?.mainBenefitList
  );

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

  useEffect(() => {
    if (
      lodash.isEmpty(mainBenefitList) &&
      lodash.isEmpty(procedureList) &&
      !(!!icu || !!therapiesType)
    ) {
      dispatch({
        type: `${NAMESPACE}/addMainBenefitItem`,
        payload: {
          treatmentId,
        },
      });
    }
  }, []);

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
          {lodash.map(lodash.compact(mainBenefitList), (item: any) => (
            <ListItemMainBenefit
              incidentId={incidentId}
              treatmentId={treatmentId}
              mainBenefitId={item}
              key={item}
            />
          ))}
          {(!!icu || !!therapiesType) && (
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
          <Add incidentId={incidentId} treatmentId={treatmentId} />
        </FormTitleCard>
      </div>
    </>
  );
};

export default ProcedureList;
