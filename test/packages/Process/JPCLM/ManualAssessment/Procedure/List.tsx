import React from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import classNames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ProcedureItem from './Item';
import Add from './Add';
import OtherProcedure from '../OtherProcedure/Item';
import { JPAC, JPADMED } from '../../Components/Procedure';
import ItemPayableList from '../Service/PayableList';
import { getServiceListByTreatment } from '../../Hooks';
import { NAMESPACE } from '../activity.config';
import styles from './List.less';
import { EProcedureType } from 'process/Enum';

const ProcedureList = ({ incidentId, treatmentId }: any) => {
  const procedureList = useSelector(
    ({ JPCLMOfClaimAssessment }: any) =>
      JPCLMOfClaimAssessment.claimEntities?.treatmentListMap?.[treatmentId]?.procedureList
  );

  const serviceList = getServiceListByTreatment({ treatmentId, NAMESPACE });

  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const otherProcedureList = useSelector(
    ({ JPCLMOfClaimAssessment }: any) =>
      JPCLMOfClaimAssessment.claimEntities?.treatmentListMap?.[treatmentId]?.otherProcedureList
  );

  const isShow =
    lodash.compact(procedureList).length > 0 || lodash.compact(otherProcedureList).length > 0;

  const getServiceComponent = ({ item }: any) => {
    const datas = {
      incidentId,
      treatmentId,
      item,
      key: item.id,
      NAMESPACE,
    };
    let Component: any = null;

    switch (item.serviceItem) {
      case EProcedureType.JPAC:
        Component = JPAC;
        break;
      case EProcedureType.JPADMED:
        Component = JPADMED;
        break;
    }
    return !!Component ? <Component {...datas} /> : null;
  };
  return (
    <div
      className={classNames({
        [styles.procedureCard]: isShow,
      })}
    >
      {isShow && (
        <h3 className={styles.title}>
          {formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.treatment',
          })}
        </h3>
      )}
      {lodash.map(lodash.compact(procedureList), (item: any) => (
        <ProcedureItem
          incidentId={incidentId}
          treatmentId={treatmentId}
          procedureId={item}
          key={item}
        />
      ))}
      {lodash.map(lodash.compact(otherProcedureList), (item: any) => (
        <OtherProcedure
          incidentId={incidentId}
          treatmentId={treatmentId}
          otherProcedureId={item}
          key={item}
        />
      ))}
      {lodash.map(serviceList || [], (item: any) => {
        return (
          <div key={item.id}>
            {getServiceComponent({ item })}
            <ItemPayableList
              incidentId={incidentId}
              treatmentId={treatmentId}
              invoiceId={item.invoiceId}
              serviceItemId={item.id}
            />
          </div>
        );
      })}
      {editable && <Add incidentId={incidentId} treatmentId={treatmentId} />}
    </div>
  );
};

export default ProcedureList;
