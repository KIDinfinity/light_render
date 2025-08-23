import React from 'react';
import lodash from 'lodash';
import { Col } from 'antd';
import { Authority, Editable, FormItemInput, Required } from 'basic/components/Form';

export const fieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'PopUp.policyInfo',
  field: 'specialDisability',
  'field-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'Specialdisability',
    },
    editable: 'N',
    required: 'N',
    visible: 'Y',
    'x-layout': {
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 14,
      },
    },
  },
};

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const isEditable = false;

  const Rules = {};

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
        labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
        rules={lodash.compact(
          (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
        )}
      />
    </Col>
  );
};

const SpecialObstacleCode = ({ field, config, form, editable, layout, isShow }: any) => (
  <Authority>
    <FormItem field={field} config={config} isShow={isShow} layout={layout} form={form} editable={editable} />
  </Authority>
);

SpecialObstacleCode.displayName = 'specialDisability';

export default SpecialObstacleCode;
