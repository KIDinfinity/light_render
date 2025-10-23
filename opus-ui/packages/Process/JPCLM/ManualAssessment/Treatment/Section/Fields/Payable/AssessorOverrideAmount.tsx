import React from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { Col } from 'antd';
import {
  formUtils,
  Authority,
  Visible,
  Editable,
  Required,
  FormItemNumber,
  Validator,
} from 'basic/components/Form';

import { BenefitCategoryMapSection } from 'claim/enum/BenefitCategoryMapSection';
import { NAMESPACE } from '../../../../activity.config';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'Treatment.Payable',
  field: 'assessorOverrideAmount',
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
      dictCode: 'app.navigator.task-detail-of-data-capture.label.assessor-override-amount',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
    'x-rules': ['VLD_000617'],
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
  treatmentPayableItem,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const claimBenefitBalanceList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimProcessData?.claimBenefitBalanceList
  );

  const claimPayableItem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.claimPayableListMap?.[treatmentPayableItem?.payableId]
  );
  const { claimDecision } =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace?.claimEntities.claimPayableListMap?.[treatmentPayableItem?.payableId]
    ) || {};

  const { coverageKey, benefitCategory } = claimPayableItem;

  const listMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.[BenefitCategoryMapSection?.[benefitCategory]]
  );

  const visibleConditions = true;
  const editableConditions = !(
    formUtils.queryValue(claimDecision) === 'D' ||
    (benefitCategory !== 'C' && benefitCategory !== 'CL')
  );
  const requiredConditions = true;

  const Rules = {
    VLD_000617: Validator.VLD_000617({
      id: treatmentPayableItem.id,
      coverageKey,
      listMap,
      claimBenefitBalanceList,
    }),
  };

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
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const AssessorOverrideAmount = ({ field, config,
  isShow,
  layout,
  form,
  editable,
  treatmentPayableItem,
}: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      treatmentPayableItem={treatmentPayableItem}
    />
  </Authority>
);

AssessorOverrideAmount.displayName = 'AssessorOverrideAmount';

export default AssessorOverrideAmount;
