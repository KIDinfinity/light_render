import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemDatePicker, Required } from 'basic/components/Form';
import { useGetInputLimitDate } from 'process/HKCLM/_hooks';
export const fieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'incident.basic',
  field: 'claimReferenceDate',
  'field-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'clmReferenceDate',
    },
    visible: 'Y',
    required: 'N',
    'x-layout': {
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 6,
      },
    },
    'no-treatment-layout': {
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 6,
      },
    },
    'no-treatment-invoice-layout': {
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 6,
      },
    },
  },
};

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const allowFreeSelect = useGetInputLimitDate();
  const fieldProps: any = fieldConfig['field-props'];

  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemDatePicker
        form={form}
        disabled={!editable || config?.editable === Editable.No}
        formName={field || fieldConfig.field}
        labelId={config?.label?.dictCode || fieldProps.label.dictCode}
        name={config?.name}
        required={config?.required === Required.Yes}
        labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
        allowFreeSelect={allowFreeSelect}
      />
    </Col>
  );
};

const ClaimReferenceDate = ({ field, config, form, editable, layout, isShow }: any) => (
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

ClaimReferenceDate.displayName = fieldConfig.field;

export default ClaimReferenceDate;
