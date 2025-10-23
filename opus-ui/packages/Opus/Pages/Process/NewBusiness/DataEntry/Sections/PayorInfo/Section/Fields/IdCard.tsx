import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemInput,
  Required,
  Visible,
  RuleByForm,
} from 'basic/components/Form';
import { VLD_001181, VLD_001183, VLD_001179 } from 'claim/pages/validators/fieldValidators';
import { useSelector } from 'dva';
import { NAMESPACE } from '../../../../activity.config';

const fieldConfig = {
  section: 'InsuredInfo',
  field: 'idCard',
  'field-props': {
    editable: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.email',
    },
    maxLength: 60,
    required: 'N',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 9,
      },
    },
  },
};

export { fieldConfig };

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const visibleConditions = RuleByForm(
    config['visible-condition'] || fieldProps['visible-condition'],
    form
  );
  const editableConditions = !RuleByForm(
    config['editable-condition'] || fieldProps['editable-condition'],
    form
  );
  const requiredConditions = RuleByForm(
    config['required-condition'] || fieldProps['required-condition'],
    form
  );
  const insuredIdCard = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.processData?.insuredInfo?.idCard
  );
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
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
          rules={[
            {
              validator: VLD_001181(),
            },
            {
              validator: VLD_001183(),
            },
            {
              validator: VLD_001179(insuredIdCard),
            },
          ]}
        />
      </Col>
    )
  );
};

const Field = ({ config, form, editable, layout, isShow }: any) => (
  <Authority>
    <FormItem
      field={fieldConfig?.field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
    />
  </Authority>
);

Field.displayName = fieldConfig?.field;

export default Field;
