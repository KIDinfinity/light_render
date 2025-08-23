import React from 'react';
import { Form } from 'antd';
import { connect, useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import { FormCard, formUtils } from 'basic/components/Form';
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

const DiagnosisItem = ({ form, incidentId, diagnosisId }: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const isRegisterMcs = useSelector(
    ({ JPCLMOfClaimAssessment }: any) => JPCLMOfClaimAssessment.isRegisterMcs
  );

  const incidentItem = useSelector(
    ({ JPCLMOfClaimAssessment }: any) =>
      JPCLMOfClaimAssessment.claimEntities?.incidentListMap?.[incidentId]
  );
  const treatmentListMap = useSelector(
    ({ JPCLMOfClaimAssessment }: any) => JPCLMOfClaimAssessment.claimEntities?.treatmentListMap
  );

  const hasTreatment = !lodash.isEmpty(incidentItem.treatmentList);

  let layoutName = 'no-treatment-layout';

  if (hasTreatment) {
    layoutName = 'treatment-no-invoice-layout';
  }

  const handleDelete = () => {
    handleMessage(
      hasDiagnosisId(treatmentListMap, diagnosisId),
      { Label_COM_WarningMessage: 'MSG_000725' },
      () => {
        dispatch({
          type: 'JPCLMOfClaimAssessment/opTreatmentListUpdateDiagnosisList',
          payload: {
            diagnosisId,
          },
        });
      },
      () => {
        dispatch({
          type: 'JPCLMOfClaimAssessment/removeDiagnosisItem',
          payload: {
            incidentId,
            diagnosisId,
          },
        });
      }
    );
    if (hasDiagnosisId(treatmentListMap, diagnosisId)) {
      handleWarnMessageModal(
        [{ content: formatMessageApi({ Label_COM_WarningMessage: 'MSG_000725' }) }],
        {
          okFn: () => {
            dispatch({
              type: 'JPCLMOfClaimAssessment/opTreatmentListUpdateDiagnosisList',
              payload: {
                diagnosisId,
              },
            });
            dispatch({
              type: 'JPCLMOfClaimAssessment/removeDiagnosisItem',
              payload: {
                incidentId,
                diagnosisId,
              },
            });
          },
        }
      );
    } else {
      dispatch({
        type: 'JPCLMOfClaimAssessment/removeDiagnosisItem',
        payload: {
          incidentId,
          diagnosisId,
        },
      });
    }
  };

  return (
    <FormCard
      showButton={editable && !isRegisterMcs}
      handleClick={handleDelete}
      className="diagnosisCard"
    >
      <Section form={form} editable={editable} layoutName={layoutName} section="Diagnosis">
        <Fields.CriticalIllness />
        <Fields.CriticalIllnessName />
        <Fields.DiagnosisCode />
        <Fields.DiagnosisDate />
        <Fields.DiagnosisDescription />
        <Fields.DiagnosisName incidentId={incidentId} diagnosisId={diagnosisId} />
        <Fields.DiagnosisType incidentId={incidentId} />
        <Fields.FirstSymptomDate />
        <Fields.SymptomDate />
        <Fields.DiagnosisNo />
        <Fields.ExistingCancerDiagnosis />
        <Fields.RelationshipCode />
      </Section>
    </FormCard>
  );
};

export default connect(
  ({ formCommonController, JPCLMOfClaimAssessment }: any, { diagnosisId }: any) => ({
    diagnosisItem: JPCLMOfClaimAssessment.claimEntities?.diagnosisListMap?.[diagnosisId],
    validating: formCommonController.validating,
    treatmentListMap: JPCLMOfClaimAssessment.claimEntities?.treatmentListMap,
  })
)(
  Form.create({
    onFieldsChange(props, changedFields) {
      const { dispatch, incidentId, diagnosisId, validating, treatmentListMap }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        handleMessage(
          changedFields.diagnosisName &&
            lodash.size(changedFields) === 1 &&
            hasDiagnosisId(treatmentListMap, diagnosisId),
          { Label_COM_WarningMessage: 'MSG_000725' },
          () => {
            dispatch({
              type: 'JPCLMOfClaimAssessment/opTreatmentListUpdateDiagnosisList',
              payload: {
                diagnosisId,
              },
            });
          },
          () => {
            if (validating) {
              setTimeout(() => {
                dispatch({
                  type: 'JPCLMOfClaimAssessment/saveEntry',
                  target: 'saveDiagnosisItem',
                  payload: {
                    changedFields,
                    incidentId,
                    diagnosisId,
                  },
                });
              }, 0);
            } else {
              dispatch({
                type: 'JPCLMOfClaimAssessment/saveFormData',
                target: 'saveDiagnosisItem',
                payload: {
                  changedFields,
                  incidentId,
                  diagnosisId,
                },
              });
            }
          }
        );
      }
    },
    mapPropsToFields(props) {
      const { diagnosisItem }: any = props;

      return formUtils.mapObjectToFields(diagnosisItem);
    },
  })(DiagnosisItem)
);
