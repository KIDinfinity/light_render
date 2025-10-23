import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'dva';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import moment from 'moment';
import MainTitle from './MainTitle';
import ExpandItem from './ExpandItem';
import { Validator } from 'basic/components/Form';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import { getServiceListByTreatment } from '../../../Hooks';
import OtherProcedureItem from '../OtherProcedure/Item';
import { EProcedureType } from 'process/Enum';
import { JPAC, JPADMED } from '../../../Components/Procedure';
import { AntiCancerAndHormone } from '../../../Components/Procedure';
import HeatstrokeProcedure from '../HeatstrokeProcedure/index';
import PainCareProcedure from '../PainCareProcedure';
import EmptyService from './EmptyService';
// import OtherProcedurePayableList from '../OtherProcedure/PayableList';
import { isAdjustmentFun } from 'opus/Pages/Process/Claim/ManualAssessment/_models/functions';
import Add from './Add';
import TherapyWrapper from './TherapyWrapper';
import OutpatientGroup from '../OutpatientDate';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';
import styles from './index.less';
import ProcedurePayable from '../Payable/ProcedurePayable';
import OPTreatmentPayable from '../Payable/OPTreatmentPayable';
import ReimbursementPayable from '../Payable/ReimbursementPayable';
import OtherProcedurePayable from '../Payable/OtherProcedurePayable';

interface Iprops {
  treatmentId: string;
  incidentId: string;
  procedureExpand: boolean;
  arrowCallBack: Function;
  havePayable: boolean;
}

const List = ({ treatmentId, incidentId, procedureExpand, arrowCallBack, havePayable }: Iprops) => {
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const procedureList =
    useSelector(
      ({ [NAMESPACE]: modelnamepspace }: any) =>
        modelnamepspace.claimEntities?.treatmentListMap?.[treatmentId]?.procedureList
    ) || [];
  const otherProcedureListMap = useSelector(
    ({ [NAMESPACE]: modelnamepspace }: any) => modelnamepspace?.claimEntities?.otherProcedureListMap
  );
  const procedureListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities.procedureListMap
  );
  const opTreatmentPayableListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities.opTreatmentPayableListMap
  );
  const dictsOfDiagnosis = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.dictsOfDiagnosis
  );
  const isAdjustmentValue = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) =>
      modelnamespace.claimEntities.treatmentListMap[treatmentId]?.isAdjustment
  );

  const isAdjustment = isAdjustmentFun(isAdjustmentValue);

  const treatmentItem =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace.claimEntities?.treatmentListMap?.[treatmentId]
    ) || {};

  const opTreatmentList = treatmentItem?.opTreatmentList;

  const groupList = lodash
    .chain(opTreatmentList)
    .filter('group')
    .orderBy((item) => moment(item.outpatientTreatmentDate).valueOf(), ['asc'])
    .uniqBy('group')
    .value();

  useEffect(() => {
    const nonGroupItem = opTreatmentList?.find((item) => !item?.group);
    if (nonGroupItem) {
      dispatch({
        type: `${NAMESPACE}/supplementGroupCode`,
        payload: {
          treatmentId,
        },
      });
    }
  }, [opTreatmentList]);

  const diagnosisCodeList = lodash
    .chain(opTreatmentPayableListMap)
    .map('diagnosisCode')
    .uniq()
    .compact()
    .value();

  useEffect(() => {
    if (lodash.size(diagnosisCodeList) && isAdjustment && !lodash.size(dictsOfDiagnosis)) {
      dispatch({
        type: `${NAMESPACE}/getDiagnosisMisDict`,
        payload: {
          dictCodes: diagnosisCodeList,
        },
      });
    }
  }, [isAdjustment]);

  const otherProcedureList = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) =>
      modelnamespace.claimEntities.treatmentListMap[treatmentId].otherProcedureList
  );

  const serviceList = getServiceListByTreatment({ treatmentId, NAMESPACE });

  const draftState = useSelector(({ [NAMESPACE]: modelnamespace }: any) => modelnamespace);
  const getProdureComponent = ({ otherProcedureItem, index, payableLength }: any) => {
    let Component: any = null;

    const errorMessage = Validator.VLD_000698(draftState, otherProcedureItem);

    const deleteCallback = () => {
      dispatch({
        type: 'opusClaimAssessment/otherProcedureDelete',
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
        Component = OtherProcedureItem;
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
      payableJSX: havePayable && (
        <OtherProcedurePayable
          otherProcedureId={otherProcedureItem.id}
          index={index}
          payableLength={payableLength}
        />
      ),
    };
    return !!Component ? (
      <>
        {!!errorMessage && (
          <div>
            <ErrorTooltipManual manualErrorMessage={errorMessage} />
          </div>
        )}
        <TherapyWrapper {...datas}>
          <Component />
        </TherapyWrapper>
      </>
    ) : null;
  };

  const getServiceComponent = ({ item, index, payableLength }: any) => {
    let Component: any = null;
    const deleteCallback = () => {
      dispatch({
        type: 'opusClaimAssessment/removeServiceItem',
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
        break;
      case EProcedureType.JPADMED:
        Component = JPADMED;
        break;
      default:
        Component = EmptyService;
    }

    const datas = {
      deleteCallback,
      incidentId,
      treatmentId,
      item,
      key: item.id,
      NAMESPACE,
      index,
      payableJSX: havePayable && (
        <ReimbursementPayable serviceItemId={item.id} index={index} payableLength={payableLength} />
      ),
    };
    return !!Component ? (
      <TherapyWrapper {...datas}>
        <Component {...datas} />
      </TherapyWrapper>
    ) : null;
  };
  const payableLength =
    (otherProcedureList?.length || 0) +
    (procedureList?.length || 0) +
    (groupList?.length || 0) +
    (serviceList?.length || 0);

  return (
    <div className={classNames(styles.procedure, procedureExpand && styles.expand)}>
      <MainTitle
        incidentId={incidentId}
        treatmentId={treatmentId}
        procedureExpand={procedureExpand}
        arrowCallBack={arrowCallBack}
        havePayable={havePayable}
      />

      <div className={styles.list}>
        {groupList.map((item, index) => {
          const groupId = item.group;
          const outpatientDelete = () => {
            dispatch({
              type: `${NAMESPACE}/opTreatmentListDelete`,
              payload: {
                treatmentId,
                deleteGroupId: groupId,
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
              hideDelete={isAdjustment}
              isAdjustment={isAdjustment}
              hideAdjustmentNo
              payableJSX={
                havePayable && (
                  <OPTreatmentPayable
                    incidentId={incidentId}
                    treatmentId={treatmentId}
                    opTreatmentIdList={opTreatmentList
                      .filter((opTreatmentItem: any) => opTreatmentItem.group === groupId)
                      .map((opTreatmentItem: any) => opTreatmentItem.id)}
                  />
                )
              }
            >
              <OutpatientGroup />
            </TherapyWrapper>
          );
        })}
        {/* {Boolean(formUtils.queryValue(treatmentItem?.icu)) && (
          <ICUItem treatmentId={treatmentId} editable={editable} />
        )} */}
        {lodash.map(procedureList, (item, index) => {
          const procedureDelete = () => {
            dispatch({
              type: `${NAMESPACE}/removeProcedureItem`,
              payload: {
                treatmentId,
                procedureId: item,
              },
            });
          };
          return (
            <TherapyWrapper
              index={index + (groupList?.length || 0)}
              incidentId={incidentId}
              treatmentId={treatmentId}
              procedureId={item}
              item={procedureListMap?.[item]}
              isAdjustment={isAdjustmentFun(procedureListMap?.[item]?.isAdjustment)}
              procedureExpand={procedureExpand}
              key={`procedure_${item}`}
              payableJSX={havePayable && <ProcedurePayable procedureId={item} />}
              deleteCallback={procedureDelete}
            >
              <ExpandItem />
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
            payableLength,
            index:
              (otherProcedureList?.length || 0) +
              (procedureList?.length || 0) +
              (groupList?.length || 0) +
              index,
          });
        })}
        {editable &&
          !isAdjustment &&
          !groupList?.length &&
          !procedureList?.length &&
          !otherProcedureList?.length &&
          !serviceList?.length && <Add treatmentId={treatmentId} havePayable={havePayable} />}
      </div>
    </div>
  );
};

export default List;
