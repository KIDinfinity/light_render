import React from 'react';
import { useSelector } from 'dva';
import { Col } from 'antd';
import { Authority, Editable, FormItemSelect, Required } from 'basic/components/Form';

export const fieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'incident.basic',
  field: 'laborConstrainedOfAmi',
  'field-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'laborConstrainedOfAMI',
    },
    expand: 'N',
    visible: 'Y',
    'x-dict': {
      dictTypeCode: 'Dropdown_CLM_laborConstrainedOfAMI',
    },
    'x-layout': {
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 17,
      },
    },
    'no-treatment-layout': {
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 17,
      },
    },
    'no-treatment-invoice-layout': {
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 17,
      },
    },
  },
};

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dictsOfLaborConstrainedOfAMI = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController[
        config?.['field-props']?.['x-dict']?.dictTypeCode ||
          fieldConfig['field-props']['x-dict'].dictTypeCode
      ]
  );

  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemSelect
        form={form}
        required={config?.required === Required.Yes}
        disabled={!editable || config?.editable === Editable.No}
        dicts={dictsOfLaborConstrainedOfAMI}
        formName={field || fieldConfig.field}
        labelId={config?.label?.dictCode || fieldProps.label.dictCode}
        name={config?.name}
        labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
      />
    </Col>
  );
};

const LaborConstrainedOfAmi = ({ field, config, form, editable, layout, isShow }: any) => (
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

LaborConstrainedOfAmi.displayName = 'LaborConstrainedOfAmi';

export default LaborConstrainedOfAmi;
