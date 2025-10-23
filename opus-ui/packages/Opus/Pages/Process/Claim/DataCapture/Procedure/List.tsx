import React from 'react';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import Item from './Item';
import { IncidentCode } from 'claim/pages/Enum';
import OtherProcedureListItem from '../OtherProcedure/Item';
import TherapyWrapper from './TherapyWrapper';
import { JPAC, JPADMED } from '../../Components/Procedure';
import { formUtils } from 'basic/components/Form';
import { EProcedureType } from 'process/Enum';
import { getServiceListByTreatment } from '../../Hooks';
import OutpatientGroup from '../OutpatientDate';
import { AntiCancerAndHormone } from '../../Components/Procedure';
import HeatstrokeProcedure from '../HeatstrokeProcedure';
import PainCareProcedure from '../PainCareProcedure';
import EmptyService from './EmptyService';
import { NAMESPACE } from '../activity.config';
import moment from 'moment';
import Add from './Add';

const ProcedureList = ({ treatmentId, incidentId }: any) => {
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);
  const dispatch = useDispatch();

  const serviceList = getServiceListByTreatment({ treatmentId, NAMESPACE });
  const procedureList = lodash.compact(
    useSelector(
      (state: any) =>
        state.opusClaimDataCapture.claimEntities?.treatmentListMap?.[treatmentId]?.procedureList
    )
  );

  const otherProcedureListMap = useSelector(
    (state: any) => state?.opusClaimDataCapture?.claimEntities?.otherProcedureListMap
  );

  const otherProcedureList = useSelector(
    (state: any) =>
      state.opusClaimDataCapture.claimEntities.treatmentListMap?.[treatmentId]?.otherProcedureList
  );

  const treatmentItem = useSelector(
    ({ opusClaimDataCapture }: any) =>
      opusClaimDataCapture.claimEntities?.treatmentListMap?.[treatmentId]
  );

  const getProdureComponent = ({ otherProcedureItem, index }: any) => {
    let Component: any = null;

    const deleteCallback = () => {
      dispatch({
        type: 'opusClaimDataCapture/otherProcedureDelete',
        payload: {
          treatmentId,
          otherProcedureId: otherProcedureItem.id,
        },
      });
    };

    switch (formUtils.queryValue(otherProcedureItem.procedureType)) {
      case 'DG1':
        Component = AntiCancerAndHormone;
        break;
      case 'DG2':
        Component = AntiCancerAndHormone;
        break;
      case 'HS':
        Component = HeatstrokeProcedure;
        break;
      case 'PC':
        Component = PainCareProcedure;
        break;
      default:
        Component = OtherProcedureListItem;
    }
    const datas = {
      incidentId,
      treatmentId,
      treatmentType: formUtils.queryValue(treatmentItem?.treatmentType),
      otherProcedureItem,
      key: otherProcedureItem.id,
      index,
      deleteCallback,
      NAMESPACE,
    };

    return !!Component ? (
      <TherapyWrapper {...datas}>
        <Component />
      </TherapyWrapper>
    ) : null;
  };

  const getServiceComponent = ({ item, index }: any) => {
    let Component: any = null;
    let deleteCallback;
    const serviceDelete = () => {
      dispatch({
        type: 'opusClaimDataCapture/serviceDelete',
        payload: {
          invoiceId: item.invoiceId,
          serviceItemId: item.id,
          treatmentId,
        },
      });
    };
    const invoiceDelete = () => {
      dispatch({
        type: 'opusClaimDataCapture/invoiceDelete',
        payload: {
          invoiceId: item.invoiceId,
          serviceItemId: item.id,
          treatmentId,
        },
      });
    };

    switch (formUtils.queryValue(item.serviceItem)) {
      case EProcedureType.JPAC:
        Component = JPAC;
        deleteCallback = serviceDelete;
        break;
      case EProcedureType.JPADMED:
        Component = JPADMED;
        deleteCallback = invoiceDelete;
        break;
      default:
        Component = EmptyService;
        deleteCallback = invoiceDelete;
    }
    const datas = {
      incidentId,
      treatmentId,
      item,
      key: item.id,
      NAMESPACE,
      index,
      deleteCallback,
    };
    return !!Component ? (
      <TherapyWrapper {...datas}>
        <Component {...datas} />
      </TherapyWrapper>
    ) : null;
  };

  const opTreatmentList = treatmentItem?.opTreatmentList;

  const groupList = lodash
    .chain(opTreatmentList)
    .filter('group')
    .orderBy((item) => moment(item.outpatientTreatmentDate).valueOf(), ['asc'])
    .uniqBy('group')
    .map('group')
    .value();

  return (
    <>
      {groupList.map((groupId, index) => {
        const outpatientDelete = () => {
          dispatch({
            type: 'opusClaimDataCapture/opTreatmentListDelete',
            payload: {
              treatmentId,
              groupId,
            },
          });
        };
        return (
          <TherapyWrapper
            incidentId={incidentId}
            treatmentId={treatmentId}
            groupId={groupId}
            key={groupId}
            deleteCallback={outpatientDelete}
            index={index}
          >
            <OutpatientGroup />
          </TherapyWrapper>
        );
      })}
      {procedureList?.map((item: any, index) => {
        const procedureDelete = () => {
          dispatch({
            type: 'opusClaimDataCapture/procedureDelete',
            payload: {
              treatmentId,
              procedureId: item,
            },
          });
        };
        return (
          <TherapyWrapper
            incidentId={incidentId}
            treatmentId={treatmentId}
            procedureId={item}
            key={item}
            index={index + (groupList?.length || 0)}
            deleteCallback={procedureDelete}
          >
            <Item />
          </TherapyWrapper>
        );
      })}
      {lodash.map(otherProcedureList, (id: any, index) => {
        const otherProcedureItem = otherProcedureListMap?.[id] || {};
        if (lodash.isEmpty(otherProcedureItem)) return null;
        return getProdureComponent({
          otherProcedureItem,
          index: (procedureList?.length || 0) + (groupList?.length || 0) + index,
        });
      })}
      {lodash.map(serviceList || [], (item: any, index) => {
        return getServiceComponent({
          item,
          index:
            (otherProcedureList?.length || 0) +
            (procedureList?.length || 0) +
            (groupList?.length || 0) +
            index,
        });
      })}
      {editable && !groupList?.length && !procedureList?.length && !otherProcedureList?.length && (
        <Add treatmentId={treatmentId} />
      )}
    </>
  );
};

export default ProcedureList;
