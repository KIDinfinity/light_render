import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemSelect, Required, Visible } from 'basic/components/Form';
import { useSelector } from 'dva';

export const fieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'treatment.basic',
  field: 'isDischarged',
  'field-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'IsDischarge',
    },
    visible: 'C',
    editable: 'C',
    required: 'C',
    'x-layout': {
      xs: {
        span: 12,
        offset: 12,
        pull: 12,
        order: 3,
      },
    },
    'no-invoice-layout': {
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 3,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_CLM_DischargeFlag',
    },
  },
};

const FormItem = ({ isShow, layout, form, editable, isTreatmentTypeIP, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dictsofDischargeFlag = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController[
        config?.['field-props']?.['x-dict']?.dictTypeCode ||
          fieldConfig['field-props']['x-dict'].dictTypeCode
      ]
  );

  const visibleConditions = isTreatmentTypeIP;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
        <FormItemSelect
          form={form}
          required={
            config?.required === Required.Conditions
              ? isTreatmentTypeIP
              : config?.required === Required.Yes
          }
          disabled={
            !editable ||
            (config?.editable === Editable.Conditions
              ? !isTreatmentTypeIP
              : config?.editable === Editable.No)
          }
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          formName={field || fieldConfig.field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          name={config?.name}
          dicts={dictsofDischargeFlag}
        />
      </Col>
    )
  );
};

const IsDischarged = ({
  field,
  config,
  form,
  editable,
  isTreatmentTypeIP,
  layout,
  isShow,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      isTreatmentTypeIP={isTreatmentTypeIP}
    />
  </Authority>
);

IsDischarged.displayName = 'IsDischarged';

export default IsDischarged;
