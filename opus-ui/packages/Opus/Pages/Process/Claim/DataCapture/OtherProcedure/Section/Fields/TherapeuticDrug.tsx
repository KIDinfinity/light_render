import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemInput,
  FormItemSelectPlus,
  Required,
  Rule,
  Visible,
} from 'basic/components/Form';
import { SearchDropDown } from 'claim/pages/utils/searchDropDown';
import { EProcedureType } from 'process/Enum';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'otherProcedure',
  field: 'therapeuticDrug',
  'field-props': {
    dateFormat: 'L',
    editable: 'Y',
    'x-dict': {
      dictTypeCode: 'DiagnosisType',
    },
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'therapeuticDrug',
    },
    required: 'C',
    'required-condition': {
      combine: '||',
      conditions: [
        {
          left: {
            domain: 'field',
            field: 'procedureType',
          },
          operator: '===',
          right: 'C',
        },
        {
          left: {
            domain: 'field',
            field: 'procedureType',
          },
          operator: '===',
          right: 'DG1',
        },
        {
          left: {
            domain: 'field',
            field: 'procedureType',
          },
          operator: '===',
          right: 'DG2',
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
            field: 'procedureType',
          },
          operator: '===',
          right: 'C',
        },
        {
          left: {
            domain: 'field',
            field: 'procedureType',
          },
          operator: '===',
          right: 'DG1',
        },
        {
          left: {
            domain: 'field',
            field: 'procedureType',
          },
          operator: '===',
          right: 'DG2',
        },
      ],
    },
    'x-layout': {
      // 480px
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 3,
      },
    },
  },
};

const seachDropDown = new SearchDropDown();
const { handleTherapeuticDrug } = seachDropDown;

export { localFieldConfig };

const FormItem = ({ isShow, layout, form, editable, config, field }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const requiredConditions = Rule(fieldProps['required-condition'], form, '');
  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');

  const procedureType = form.getFieldValue('procedureType');
  const showSelect = procedureType === EProcedureType.DG2;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        {showSelect ? (
          <FormItemSelectPlus
            allowClear
            required={
              (config.required || fieldProps.required) === Required.Conditions
                ? requiredConditions
                : (config.required || fieldProps.required) === Required.Yes
            }
            form={form}
            formName={config.name || field}
            labelId={config.label?.dictCode || fieldProps.label.dictCode}
            labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
            disabled={
              !editable ||
              ((config?.editable || fieldProps.editable) === Editable.Conditions
                ? !editableConditions
                : (config?.editable || fieldProps.editable) === Editable.No)
            }
            optionShowType="name"
            searchCustom={(postData: any) => {
              return handleTherapeuticDrug(postData, form.getFieldValue('therapeuticDrugs'));
            }}
          />
        ) : (
          <FormItemInput
            form={form}
            formName={config.name || field}
            labelId={config.label?.dictCode || fieldProps.label.dictCode}
            labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
            disabled={
              !editable ||
              ((config?.editable || fieldProps.editable) === Editable.Conditions
                ? !editableConditions
                : (config?.editable || fieldProps.editable) === Editable.No)
            }
            required={
              (config.required || fieldProps.required) === Required.Conditions
                ? requiredConditions
                : (config.required || fieldProps.required) === Required.Yes
            }
          />
        )}
      </Col>
    )
  );
};

const TherapeuticDrug = ({ field, config, form, editable, layout, isShow }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
    />
  </Authority>
);

TherapeuticDrug.displayName = localFieldConfig.field;

export default TherapeuticDrug;
