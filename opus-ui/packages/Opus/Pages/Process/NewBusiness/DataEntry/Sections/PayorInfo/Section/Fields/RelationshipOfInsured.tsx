import React, { useContext } from 'react';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  RuleByForm,
} from 'basic/components/Form';
import { useSelector } from 'dva';
import { NAMESPACE } from '../../../../activity.config';

import Context from 'opus/Pages/Process/NewBusiness/DataEntry/_context/Context';
import { useVisibleLinkFn } from 'opus/Pages/Process/NewBusiness/DataEntry/_context/VisibleContainer';

const fieldConfig = {
  section: 'InsuredInfo',
  field: 'relationshipOfInsured',
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

const FormItem = ({ isShow, layout, form, editable, field, config, section }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const visibleLinkTriggerConfig =
    useContext(Context)?.visibleLinkTriggerConfig?.[`${section}_${field}`];

  let dicts = getDrowDownList(
    config['x-dict']?.dictTypeCode || fieldConfig?.['field-props']?.['x-dict']?.dictTypeCode
  );
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

  // 未成年不能自己给自己的保单付钱
  const isInsuredUnderAge = useSelector(
    (state) => state[NAMESPACE].processData?.insuredInfo?.age <= 20
  );
  if (isInsuredUnderAge) {
    dicts = dicts.filter(({ dictCode }) => dictCode !== '027');
  }

  const onChange = useVisibleLinkFn(visibleLinkTriggerConfig, field);

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
              ? editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          hiddenPrefix
          precision={2}
          onChange={onChange}
        />
      </Col>
    )
  );
};

const Field = ({ config, form, editable, layout, isShow, section }: any) => (
  <Authority>
    <FormItem
      field={fieldConfig?.field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      section={section}
    />
  </Authority>
);

Field.displayName = fieldConfig?.field;

export default Field;
