import React from 'react';
import { Col } from 'antd';

import {
  Authority,
  Editable,
  FormItemSelectPlus,
  Required,
  Rule,
  Visible,
} from 'basic/components/Form';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'paymentAllocation.bankAccount',
  field: 'branchCode',
  'field-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'BranchCode',
    },
    editable: 'C',
    'editable-condition': {
      combine: '||',
      conditions: [
        {
          left: {
            domain: 'field',
            field: 'bankType',
          },
          operator: '===',
          right: 'BANK',
        },
      ],
    },
    required: 'C',
    'required-condition': {
      combine: '||',
      conditions: [
        {
          left: {
            domain: 'field',
            field: 'bankType',
          },
          operator: '===',
          right: 'BANK',
        },
      ],
    },
    visible: 'C',
    'visible-condition': {
      combine: '||',
      conditions: [
        {
          left: {
            domain: 'field',
            field: 'bankType',
          },
          operator: '===',
          right: 'BANK',
        },
      ],
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_CLM_CancelFunction',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 22,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 22,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 22,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 22,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 22,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 22,
      },
    },
  },
};

export { localFieldConfig };

const FormItem = ({ isShow, layout, form, editable, field, config, handleDict, payeeId }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const bankCode = form.getFieldValue('bankCode');

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  return isShow && (
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelectPlus
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
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          searchName="bankBranchJp"
          optionShowType="both"
          searchCustom={(postData: any) => handleDict(postData)}
          extraData={bankCode}
          selectCallbackExProp="branchName"
        />
      </Col>
    )
  );
};

const BranchCode = ({
  field,
  config,
  form,
  editable,
  layout,
  isShow,
  handleDict,
  payeeId,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      handleDict={handleDict}
      payeeId={payeeId}
    />
  </Authority>
);

BranchCode.displayName = 'branchCode';

export default BranchCode;
