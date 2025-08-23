import React from 'react';
import {v4 as uuidv4 } from 'uuid';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import { TherapiesType as TherapiesTypeEnum } from 'claim/pages/Enum';
import Procedure, { FieldsBasic as Fields } from 'process/Components/BussinessControls/Procedure';

const MainBenefitListItem = ({ NAMESPACE, form, editable, treatmentId, mainBenefitId }: any) => {
  return (
    <Procedure.Section
      form={form}
      editable={editable}
      section="Procedure"
      NAMESPACE={NAMESPACE}
      id={mainBenefitId}
    >
      <Fields.TherapiesType treatmentId={treatmentId} />
      <Fields.MainBenifit treatmentId={treatmentId} />
      <Fields.Doctor />
    </Procedure.Section>
  );
};

export default connect((state: any, { NAMESPACE, mainBenefitId }: any) => ({
  validating: state?.formCommonController.validating,
  mainBenefitItem: state?.[NAMESPACE]?.claimEntities?.mainBenefitListMap?.[mainBenefitId],
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { therapiesType } = changedFields;
      const { NAMESPACE, dispatch, mainBenefitId, treatmentId, validating } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'saveMainBenefitItem',
              payload: {
                changedFields,
                treatmentId,
                mainBenefitId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'saveMainBenefitItem',
            payload: {
              changedFields,
              treatmentId,
              mainBenefitId,
            },
          });
        }
        if (
          !!formUtils.queryValue(therapiesType) &&
          formUtils.queryValue(therapiesType) !== TherapiesTypeEnum.MainBenefit
        ) {
          dispatch({
            type: `${NAMESPACE}/removeMainBenefitItem`,
            payload: {
              treatmentId,
              mainBenefitId,
            },
          });
          const therapiesType = formUtils.queryValue(changedFields?.therapiesType);
          if (therapiesType === TherapiesTypeEnum.ICU) {
            dispatch({
              type: `${NAMESPACE}/saveTreatmentItem`,
              payload: {
                changedFields,
                treatmentId,
              },
            });
          }
          if (therapiesType === TherapiesTypeEnum.Surgery) {
            dispatch({
              type: `${NAMESPACE}/addProcedureItem`,
              payload: {
                treatmentId,
                procedureId: uuidv4(),
                changedFields,
              },
            });
          }
          if (therapiesType === TherapiesTypeEnum.MainBenefit) {
            dispatch({
              type: `${NAMESPACE}/addMainBenefitItem`,
              payload: {
                treatmentId,
              },
            });
          }
        }
      }
    },
    mapPropsToFields(props: any) {
      const { mainBenefitItem } = props;

      const therapiesType = lodash.has(mainBenefitItem, 'therapiesType')
        ? mainBenefitItem.therapiesType
        : 'MainBenefit';
      console.log('mainBenefitItem', { ...mainBenefitItem, therapiesType });
      return formUtils.mapObjectToFields({ ...mainBenefitItem, therapiesType });
    },
  })(MainBenefitListItem)
);
