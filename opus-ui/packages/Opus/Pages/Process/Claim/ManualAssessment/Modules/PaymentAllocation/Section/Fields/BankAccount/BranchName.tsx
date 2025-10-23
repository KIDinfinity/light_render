import React from 'react';
import lodash from 'lodash';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelectPlus,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import { SeachCustom } from 'claim/pages/utils/claimUtils';

const seachCustom = new SeachCustom();

export const fieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'paymentAllocation.bankAccount',
  field: 'branchName',
  'field-props': {
    label: {
      dictTypeCode: 'Label_CLM_Opus',
      dictCode: 'branchName',
    },
    editable: 'N',
    required: 'N',
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
    'x-layout': {
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 23,
      },
    },
  },
};

const FormItem = ({ isShow, layout, form, editable, field, config, handleDict, payeeId }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const bankCode = form.getFieldValue('bankCode');

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');
  const Rules = {};

  return isShow && (
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelectPlus
          form={form}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          formName={field || fieldConfig.field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          name={config?.name}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          searchName="bankBranch"
          optionShowType="name"
          searchCustom={(postData: any) => handleDict(postData)}
          extraData={bankCode}
          saveName
        />
      </Col>
    )
  );
};

const BranchName = ({
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

BranchName.displayName = 'branchName';

export default BranchName;
