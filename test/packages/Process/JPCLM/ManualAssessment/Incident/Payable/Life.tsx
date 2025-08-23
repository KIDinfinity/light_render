import React from 'react';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { connect, useSelector } from 'dva';
import { ClaimDecision } from 'claim/pages/utils/claim';
import Section, { PayableLifeFields as Fields } from '../Section';

const ClaimPayableListItemOfLife = ({
  form,
  incidentPayableItem,
  hasTreatment,
  curIncidentPayableList,
  noPolicyNo,
}: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const layoutName = hasTreatment ? 'x-layout' : 'no-treatment-layout';
  const isDeclined = formUtils.queryValue(incidentPayableItem.claimDecision) === ClaimDecision.deny;
  const isNA = formUtils.queryValue(incidentPayableItem.claimDecision) === ClaimDecision.NA;

  return (
    <Section
      form={form}
      editable={editable}
      section="Incident.Payable.Life"
      layoutName={layoutName}
    >
      <Fields.ProductCode isDeclined={isDeclined} incidentPayableItem={incidentPayableItem} />
      <Fields.BenefitTypeCode
        incidentPayableItem={incidentPayableItem}
        curIncidentPayableList={curIncidentPayableList}
        isDeclined={isDeclined}
        isNA={isNA}
      />
      <Fields.BenefitItemCode />
      <Fields.ClaimReferenceDate />
      <Fields.ClaimDecision incidentPayableItem={incidentPayableItem} />
      <Fields.Remark />
    </Section>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create({
    onFieldsChange(props, changedFields) {
      const { dispatch, incidentPayableId, validating }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfClaimAssessment/saveEntry',
              target: 'saveLifePayable',
              payload: {
                changedFields,
                incidentPayableId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'JPCLMOfClaimAssessment/saveFormData',
            target: 'saveLifePayable',
            payload: {
              changedFields,
              incidentPayableId,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const {
        incidentPayableItem: { lifePayable },
      }: any = props;
      return formUtils.mapObjectToFields(lifePayable);
    },
  })(ClaimPayableListItemOfLife)
);
