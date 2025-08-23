import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemInput,
  Required,
} from 'basic/components/Form';

export const fieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'PopUp.klip7616',
  field: 'offsetAccruedYearMonth',
  'field-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'OffsetNextPayToDay',
    },
    editable: 'Y',
    required: 'N',
    visible: 'Y',
    maxLength: '6',
    'x-layout': {
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 5,
      },
    },
  },
};

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const isEditable = false;

  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemInput
        form={form}
        required={config?.required === Required.Yes}
        disabled={
          !editable ||
          (config?.editable === Editable.Conditions ? isEditable : config?.editable === Editable.No)
        }
        formName={field || fieldConfig.field}
        labelId={config?.label?.dictCode || fieldProps.label.dictCode}
        name={config?.name}
        maxLength={config?.maxLength}
        labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
      />
    </Col>
  );
};

const OffsetAccruedYearMonth = ({ field, config, form, editable, layout, isShow }: any) => (
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

OffsetAccruedYearMonth.displayName = 'offsetAccruedYearMonth';

export default OffsetAccruedYearMonth;
