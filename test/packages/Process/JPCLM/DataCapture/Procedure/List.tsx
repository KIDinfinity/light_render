import React from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Item from './Item';
import OtherProcedureListItem from '../OtherProcedure/Item';
import { DG1, JPAC, JPADMED } from '../../Components/Procedure';
import { formUtils } from 'basic/components/Form';
import { EProcedureType } from 'process/Enum';
import { getServiceListByTreatment } from '../../Hooks';
import { NAMESPACE } from '../activity.config';
import Add from './Add';
import styles from './List.less';

const ProcedureList = ({ treatmentId, incidentId }: any) => {
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);

  const serviceList = getServiceListByTreatment({ treatmentId, NAMESPACE });
  const procedureList = useSelector(
    (state: any) =>
      state.JPCLMOfDataCapture.claimEntities?.treatmentListMap?.[treatmentId]?.procedureList
  );

  const otherProcedureListMap = useSelector(
    (state: any) => state?.JPCLMOfDataCapture?.claimEntities?.otherProcedureListMap
  );

  const otherProcedureList = useSelector(
    (state: any) =>
      state.JPCLMOfDataCapture.claimEntities.treatmentListMap?.[treatmentId]?.otherProcedureList
  );

  const getProdureComponent = ({ otherProcedureItem }: any) => {
    const datas = {
      incidentId,
      treatmentId,
      otherProcedureItem,
      key: otherProcedureItem.id,
    };
    let Component: any = null;
    switch (formUtils.queryValue(otherProcedureItem.procedureType)) {
      case 'DG1':
        Component = DG1;
        break;
      default:
        Component = OtherProcedureListItem;
    }
    return !!Component ? <Component {...datas} /> : null;
  };
  const getServiceComponent = ({ item }: any) => {
    const datas = {
      incidentId,
      treatmentId,
      item,
      key: item.id,
      NAMESPACE,
    };
    let Component: any = null;

    switch (formUtils.queryValue(item.serviceItem)) {
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
    <div className={styles.procedureCard}>
      <div>
        <h3 className={styles.title}>
          {formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.treatment',
          })}
        </h3>
        {lodash.map(lodash.compact(procedureList), (item: any) => (
          <Item incidentId={incidentId} treatmentId={treatmentId} procedureId={item} key={item} />
        ))}
        {lodash.map(otherProcedureList, (id: any) => {
          const otherProcedureItem = otherProcedureListMap?.[id] || {};
          if (lodash.isEmpty(otherProcedureItem)) return null;
          return getProdureComponent({ otherProcedureItem });
        })}
        {lodash.map(serviceList || [], (item: any) => {
          return getServiceComponent({ item });
        })}
      </div>

      {editable && <Add treatmentId={treatmentId} incidentId={incidentId} />}
    </div>
  );
};

export default ProcedureList;
