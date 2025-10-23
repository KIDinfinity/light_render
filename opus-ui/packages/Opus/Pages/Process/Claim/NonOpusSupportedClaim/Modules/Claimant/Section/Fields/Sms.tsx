import React from 'react';
import { useDispatch } from 'dva';
import { Col } from 'antd';
import { Authority, Editable, FormItemSelect, Rule, Required } from 'basic/components/Form';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { NAMESPACE } from 'opus/Pages/Process/Claim/NonOpusSupportedClaim/activity.config';

const localFieldConfig = {
  caseCategory: 'JP_CLM_CTG006',
  activityCode: 'JP_CLM_003',
  section: 'Claimant',
  field: 'sms',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'SMS',
    },
    visible: 'Y',
    required: false,
    'x-dict': {
      dictTypeCode: 'Dropdown_COM_Indicator',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 8,
      },
    },
  },
};

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config = {} }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const dispatch = useDispatch();
  const isSelfOrPolicyOwner = Rule(
    fieldProps['editable-condition'],
    form,
    'opusNonOpusClaimManagement'
  );

  const dicts = getDrowDownList(
    config['x-dict']?.dictTypeCode || localFieldConfig?.['field-props']?.['x-dict']?.dictTypeCode
  );

  const requiredConditions = false;

  return (
    isShow && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
          disabled={
            !editable ||
            (config.editable === Editable.Conditions
              ? isSelfOrPolicyOwner
              : config?.editable === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || localFieldConfig['field-props'].label.dictCode}
          labelTypeCode={
            config.label?.dictTypeCode || localFieldConfig['field-props'].label.dictTypeCode
          }
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          onChange={(value: any) => {
            dispatch({
              type: `${NAMESPACE}/syncFieldData`,
              payload: {
                sms: value,
              },
            });
          }}
        />
      </Col>
    )
  );
};

const Sms = ({ field, config, form, editable, layout, isShow }: any) => (
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

Sms.displayName = 'Sms';

export default Sms;
