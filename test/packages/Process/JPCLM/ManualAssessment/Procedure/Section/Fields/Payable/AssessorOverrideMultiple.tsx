import React from 'react';
import { Col } from 'antd';
import { useSelector } from 'dva';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemNumber,
  formUtils,
} from 'basic/components/Form';
import { ClaimDecision } from 'claim/pages/utils/claim';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'Procedure.Payable',
  field: 'assessorOverrideMultiple',
  'field-props': {
    visible: 'Y',
    editable: 'C',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-claim-assessment.label.assessor-override-percentage',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 9,
      },
    },
  },
};

export { localFieldConfig };

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  procedurePayableItem,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const incidentPayableItem = useSelector(
    ({ JPCLMOfClaimAssessment }: any) =>
      JPCLMOfClaimAssessment.claimEntities?.claimPayableListMap?.[procedurePayableItem?.payableId]
  );

  const visibleConditions = true;
  const editableConditions = !(
    formUtils.queryValue(incidentPayableItem?.claimDecision) === ClaimDecision.deny
  );
  // Rule(fieldProps['editable-condition'], form, 'JPCLMOfClaimAssessment');
  const requiredConditions = true;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemNumber
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          min={-Number.MAX_VALUE}
          pattern={
            /^(\-)?(\d{1,3})(\.99|\.9[0-8]*|\.[0-8]\d*)?$/g
          }
          hiddenPrefix
        />
      </Col>
    )
  );
};

const AssessorOverrideMultiple = ({ field, config,
  isShow,
  layout,
  form,
  editable,
  procedurePayableItem,
}: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      procedurePayableItem={procedurePayableItem}
    />
  </Authority>
);

AssessorOverrideMultiple.displayName = 'AssessorOverrideMultiple';

export default AssessorOverrideMultiple;
