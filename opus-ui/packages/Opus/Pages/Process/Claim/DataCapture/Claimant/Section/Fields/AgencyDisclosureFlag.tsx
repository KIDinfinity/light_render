import React from 'react';
import { Col } from 'antd';
import { useDispatch } from 'dva';
import {
  Authority,
  Editable,
  FormItemSelect,
  Visible,
  Required,
  Rule,
} from 'basic/components/Form';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { NAMESPACE } from '../../../activity.config';

const localFieldConfig = {
  section: 'Claimant',
  field: 'agencyDisclosureFlag',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_COM_OPUS',
      dictCode: 'agencyDisclosureFlag',
    },
    required: 'N',
    visible: 'Y',
    'x-dict': {
      dictTypeCode: 'Dropdown_COM_YN',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 11,
      },
    },
  },
};

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config = {} }: any) => {
  const dispatch = useDispatch();
  const dicts = getDrowDownList(
    config['x-dict']?.dictTypeCode || localFieldConfig?.['field-props']?.['x-dict']?.dictTypeCode
  );
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = Rule(fieldProps['editable-condition'], form, 'opusClaimDataCapture');
  const requiredConditions = true;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
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
          onChange={(value: any) => {
            dispatch({
              type: `${NAMESPACE}/syncFieldData`,
              payload: {
                agencyDisclosureFlag: value,
                dicts,
              },
            });
          }}
        />
      </Col>
    )
  );
};

const AgencyDisclosureFlag = ({ field, config, form, editable, layout, isShow }: any) => (
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

AgencyDisclosureFlag.displayName = 'agencyDisclosureFlag';

export default AgencyDisclosureFlag;
