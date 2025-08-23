import React from 'react';
import { connect, useSelector, useDispatch } from 'dva';
import { Form } from 'antd';
import lodash from 'lodash';
import { formUtils, FormCard } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { handleWarnMessageModal } from '@/utils/commonMessage';
import Section, { Fields } from './Section';

const hasDiagnosisId = (treatmentListMap, diagnosisId) => {
  return lodash.some(treatmentListMap, (element) =>
    lodash.some(element.opTreatmentList, (item) =>
      lodash.some(item.diagnosisIdList, (id) => id === diagnosisId)
    )
  );
};

const handleMessage = (
  flag: boolean,
  message: object,
  okSpecialFn: Function,
  okDefaultFn: Function
) => {
  if (flag) {
    handleWarnMessageModal([{ content: formatMessageApi(message) }], {
      okFn: () => {
        okSpecialFn();
        okDefaultFn();
      },
    });
  } else {
    okDefaultFn();
  }
};

const Item = ({ form, diagnosisItem }: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);

  const { id, incidentId } = diagnosisItem;

  const incidentItem = useSelector(
    ({ JPCLMOfDataCapture }: any) => JPCLMOfDataCapture.claimEntities?.incidentListMap?.[incidentId]
  );

  const treatmentListMap = useSelector(
    ({ JPCLMOfDataCapture }: any) => JPCLMOfDataCapture.claimEntities?.treatmentListMap
  );

  const hasTreatment = !lodash.isEmpty(incidentItem.treatmentList);


  let layoutName = 'x-layout';
  if (!hasTreatment) {
    layoutName = 'no-treatment-layout';
  } else {
    layoutName = 'treatment-no-invoice-layout';
  }

  const handleDelete = () => {
    handleMessage(
      hasDiagnosisId(treatmentListMap, id),
      { Label_COM_WarningMessage: 'MSG_000725' },
      () => {
        dispatch({
          type: 'JPCLMOfDataCapture/opTreatmentListUpdateDiagnosisList',
          payload: {
            diagnosisId: id,
          },
        });
      },
      () => {
        dispatch({
          type: 'JPCLMOfDataCapture/diagnosisDelete',
          payload: {
            incidentId,
            diagnosisId: id,
          },
        });
      }
    );
  };

  return (
    <FormCard showButton={editable} handleClick={handleDelete} className="diagnosisCard">
      <Section form={form} editable={editable} layoutName={layoutName} section="diagnosis">
        <Fields.DiagnosisName incidentId={incidentId} diagnosisId={id} />
        <Fields.DiagnosisCode />
        <Fields.DiagnosisType incidentId={incidentId} />
        <Fields.ExistingCancerDiagnosis />
        <Fields.DiagnosisDate />
        <Fields.FirstSymptomDate />
        <Fields.DiagnosisDescription />
        <Fields.SymptomDate />
        <Fields.CriticalIllness />
        <Fields.CriticalIllnessName />
        <Fields.DiagnosisNo />
        <Fields.RelationshipCode />
      </Section>
    </FormCard>
  );
};

export default connect(
  ({ formCommonController, JPCLMOfDataCapture }: any, { diagnosisId }: any) => ({
    validating: formCommonController.validating,
    diagnosisItem: JPCLMOfDataCapture.claimEntities.diagnosisListMap[diagnosisId],
    treatmentListMap: JPCLMOfDataCapture.claimEntities?.treatmentListMap,
  })
)(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, validating, diagnosisItem, treatmentListMap } = props;
      const { id, incidentId } = diagnosisItem;

      if (formUtils.shouldUpdateState(changedFields)) {
        handleMessage(
          changedFields.diagnosisName &&
            lodash.size(changedFields) === 1 &&
            hasDiagnosisId(treatmentListMap, id),
          { Label_COM_WarningMessage: 'MSG_000725' },
          () => {
            dispatch({
              type: 'JPCLMOfDataCapture/opTreatmentListUpdateDiagnosisList',
              payload: {
                diagnosisId: id,
              },
            });
          },
          () => {
            if (validating) {
              setTimeout(() => {
                dispatch({
                  type: 'JPCLMOfDataCapture/saveEntry',
                  target: 'diagnosisUpdate',
                  payload: {
                    changedFields,
                    incidentId,
                    diagnosisId: id,
                  },
                });
              }, 0);
            } else {
              dispatch({
                type: 'JPCLMOfDataCapture/saveFormData',
                target: 'diagnosisUpdate',
                payload: {
                  changedFields,
                  incidentId,
                  diagnosisId: id,
                },
              });
            }
          }
        );
      }
    },
    mapPropsToFields(props) {
      const { diagnosisItem } = props;

      return formUtils.mapObjectToFields(diagnosisItem);
    },
  })(Item)
);
