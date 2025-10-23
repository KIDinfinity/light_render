import React from 'react';
import { Col } from 'antd';
import { useDispatch } from 'dva';
import {
  Authority,
  Editable,
  Visible,
  FormItemSelectPlus,
  Rule,
  Required,
} from 'basic/components/Form';
import { SeachCustom } from 'claim/pages/utils/claimUtils';

const seachCustom: any = new SeachCustom();
const { handleBankBranch } = seachCustom;

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'payee',
  field: 'branchCode',
  'field-props': {
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
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'BranchCode',
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
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 15,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 15,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 15,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 15,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 15,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 15,
      },
    },
  },
};

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config, bankCodeCache }: any) => {
  const dispatch = useDispatch();
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const bankCode = form.getFieldValue('bankCode');

  const onSelect = (value: any, typeCode: any, exProps: any) => {
    dispatch({
      type: 'opusClaimDataCapture/payeeUpdate',
      payload: {
        changedFields: { branchName: exProps },
      },
    });
  };
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? !!visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelectPlus
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          extraData={bankCode}
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label?.dictTypeCode}
          maxLength={config?.maxLength}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          searchName="bankBranchJp"
          onSelectCallback={onSelect}
          optionShowType="both"
          searchCustom={(postData: any) => handleBankBranch(postData)}
          selectCallbackExProp="branchName"
        />
      </Col>
    )
  );
};

const BranchCode = ({ field, config, form, editable, layout, isShow, ...res }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      {...res}
    />
  </Authority>
);

BranchCode.displayName = 'BranchCode';

export default BranchCode;
