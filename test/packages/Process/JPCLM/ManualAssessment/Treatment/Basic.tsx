import React from 'react';
import { Form, Collapse } from 'antd';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { IncidentCode } from 'claim/pages/Enum';
import { useSelector } from 'dva';
import Header from './Header';
import Expand from './Expand';
import OutpatientList from '../OutpatientDate/List';
import ProcedureList from '../Procedure/List';
import style from './Item.less';

const { Panel } = Collapse;

const Basic = ({ form, incidentId, treatmentId, isAdjustment }: any) => {
  const incidentItem = useSelector(
    ({ JPCLMOfClaimAssessment }: any) =>
      JPCLMOfClaimAssessment.claimEntities?.incidentListMap?.[incidentId]
  );

  const treatmentType = useSelector(
    ({ JPCLMOfClaimAssessment }: any) =>
      JPCLMOfClaimAssessment.claimEntities.treatmentListMap[treatmentId]?.treatmentType
  );

  const isTreatmentTypeOP = formUtils.queryValue(treatmentType) === IncidentCode.OutPatient;
  const claimTypeArray = formUtils.queryValue(lodash.get(incidentItem, 'claimTypeArray'));
  const isIncludePA = lodash.includes(claimTypeArray, IncidentCode.PA);
  const showExpand = isIncludePA && isTreatmentTypeOP;
  return (
    <div className={style.treatmentCard}>
      <>
        {showExpand && (
          <Collapse bordered={false}>
            <Panel
              header={
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {/**
                   //@ts-ignore */}
                  <Header treatmentId={treatmentId} incidentId={incidentId} />
                </div>
              }
              key={treatmentId}
            >
              <Expand treatmentId={treatmentId} incidentId={incidentId} />
              {isTreatmentTypeOP && (
                <OutpatientList treatmentId={treatmentId} incidentId={incidentId} />
              )}
              {!isAdjustment && <ProcedureList incidentId={incidentId} treatmentId={treatmentId} />}
            </Panel>
          </Collapse>
        )}
        {!showExpand && (
          <>
            {/**
             //@ts-ignore */}

            <Header treatmentId={treatmentId} incidentId={incidentId} />
            <Expand treatmentId={treatmentId} incidentId={incidentId} />
            {isTreatmentTypeOP && (
              <OutpatientList treatmentId={treatmentId} incidentId={incidentId} />
            )}
            {!isAdjustment && <ProcedureList incidentId={incidentId} treatmentId={treatmentId} />}
          </>
        )}
      </>
    </div>
  );
};

export default Form.create<any>({
  onFieldsChange(props, changedFields) {
    const { dispatch, incidentId, treatmentId, validating }: any = props;
    const temChangedFields = { ...changedFields };
    if (lodash.has(changedFields, 'icu')) {
      temChangedFields.icu = changedFields.icu.value ? 1 : 0;
    }

    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'JPCLMOfClaimAssessment/saveEntry',
            target: 'saveTreatmentItem',
            payload: {
              changedFields: temChangedFields,
              incidentId,
              treatmentId,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'JPCLMOfClaimAssessment/saveFormData',
          target: 'saveTreatmentItem',
          payload: {
            changedFields: temChangedFields,
            incidentId,
            treatmentId,
          },
        });
      }
    }
  },
  mapPropsToFields(props: any) {
    const { treatmentItem } = props;

    return formUtils.mapObjectToFields(treatmentItem);
  },
})(Basic);
