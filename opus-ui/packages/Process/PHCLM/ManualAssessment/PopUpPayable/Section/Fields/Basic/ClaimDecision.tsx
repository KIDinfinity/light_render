import React, { useMemo } from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import { Authority, Visible, Editable, Required, FormItemSelect } from 'basic/components/Form';

import { useSelector } from 'dva';
import { localFieldConfig } from './ClaimDecision.config';

export { localFieldConfig } from './ClaimDecision.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const dicts = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController[
        config['x-dict']?.dictTypeCode || localFieldConfig['field-props']['x-dict'].dictTypeCode
      ]
  );
  // 排除这个选项的原因是点confirn的时候会当把这个值为D时会设置为A,所以直接排除这个选项
  const list = useMemo(() => {
    return lodash.filter(dicts, (el: any) => el.dictCode !== 'D');
  }, [dicts]);

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={list}
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
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
          getPopupContainer={() => document.body}
          // labelType="inline"
        />
      </Col>
    )
  );
};

const ClaimDecision = ({ field, config, isShow, layout, form, editable }: any) => (
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

ClaimDecision.displayName = 'ClaimDecision';

export default ClaimDecision;
