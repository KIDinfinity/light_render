import React from 'react';
import { useSelector } from 'dva';
import { Col } from 'antd';
import {
  formUtils,
  Authority,
  Visible,
  Editable,
  Required,
  FormItemNumber,
  Rule,
} from 'basic/components/Form';
import { NAMESPACE } from '../../../../activity.config';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'OtherProcedure.Payable',
  field: 'assessorOverrideMultiple',
  'field-props': {
    visible: 'C',
    'visible-condition': {
      combine: '||',
      conditions: [
        { left: { domain: 'field', field: 'benefitCategory' }, operator: '!==', right: 'CIC' },
      ],
    },
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
        span: 12,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1600px
      xxl: {
        span: 12,
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
  otherProcedurePayableItem,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const claimPayableItem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.claimPayableListMap?.[otherProcedurePayableItem?.payableId]
  );

  const isDeny = formUtils.queryValue(claimPayableItem?.claimDecision) === 'D';

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = !isDeny;
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
          hiddenPrefix
          min={-Number.MAX_VALUE}
          pattern={
            /^(\-)?(\d{1,3})(\.99|\.9[0-8]*|\.[0-8]\d*)?$/g
          }
        />
      </Col>
    )
  );
};

const AssessorOverrideMultiple = ({
  field,
  config,
  isShow,
  layout,
  form,
  editable,
  otherProcedurePayableItem,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      otherProcedurePayableItem={otherProcedurePayableItem}
    />
  </Authority>
);

AssessorOverrideMultiple.displayName = 'AssessorOverrideMultiple';

export default AssessorOverrideMultiple;
