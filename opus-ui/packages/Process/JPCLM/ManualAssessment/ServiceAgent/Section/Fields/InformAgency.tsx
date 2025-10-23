import React from 'react';
import { useSelector } from 'dva';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
} from 'basic/components/Form';

export const fieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'ServiceAgent',
  field: 'informTheAgency',
  'field-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'InformAgency',
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_CLM_InformAgency',
    },
    required: 'N',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 10,
      },
    },
  },
};

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dictsOfCauseOfIncident = useSelector(
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
        disabled={!editable || config?.editable === Editable.No}
        required={config?.required === Required.Yes}
        dicts={dictsOfCauseOfIncident}
        formName={field || fieldConfig.field}
        labelId={config?.label?.dictCode || fieldProps.label.dictCode}
        labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
        name={config?.name}
      />
    </Col>
  );
};

const InformAgency = ({ field, config, form, editable, layout, isShow }: any) => (
  <Authority>
    <FormItem field={field} config={config} isShow={isShow} layout={layout} form={form} editable={editable} />
  </Authority>
);

InformAgency.displayName = 'InformTheAgency';

export default InformAgency;
