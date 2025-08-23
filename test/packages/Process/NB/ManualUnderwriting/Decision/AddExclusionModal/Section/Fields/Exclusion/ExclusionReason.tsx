import React from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { tenant, Region } from '@/components/Tenant';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  RuleByForm,
} from 'basic/components/Form';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { fieldConfig } from './ExclusionReason.config';

export { fieldConfig } from './ExclusionReason.config';

const FormItem = ({ isShow, editable, field, config, layout, form }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const regionCode = tenant.region();
  const exclusionList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.exclusionList,
    shallowEqual
  );
  const exclusionReasonList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.exclusionReasonList,
    shallowEqual
  );
  const dicts = (() => {
    const healthReason = lodash
      .chain(exclusionList)
      .find((item: any) => item.localExclusionCode === form.getFieldValue('code'))
      .get('healthReason')
      .value();
    if (healthReason === 'N' && regionCode === Region.VN) {
      return [];
    } else {
      return exclusionReasonList;
    }
  })();
  const visibleConditions = !lodash.isEmpty(dicts);
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = !lodash.isEmpty(dicts);

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
          dictCode={fieldProps['x-dict'].dictTypeCode}
          dictName={fieldProps['x-dict'].dictTypeName}
          optionShowType="both"
        />
      </Col>
    )
  );
};

const ExclusionReason = ({ field, config, form, editable, isShow, layout }: any) => {
  return (
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
};

ExclusionReason.displayName = fieldConfig.field;

export default ExclusionReason;
