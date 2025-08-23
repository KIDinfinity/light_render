import React from 'react';
import { Col } from 'antd';
import { Authority, FormItemSelect, formUtils } from 'basic/components/Form';
import { localFieldConfig } from './TenDaysHospitalizationFlg.config';
export { localFieldConfig } from './TenDaysHospitalizationFlg.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const [mergedConfig] = formUtils.useMergeFieldConfig(
    localFieldConfig['field-props'] as any,
    config
  );
  const [visible, configEditable, required, dicts] = formUtils.useFieldConfig(mergedConfig, form);

  return isShow && visible ? (
    <Col {...layout}>
      <FormItemSelect
        disabled={!editable || !configEditable}
        required={required}
        dicts={dicts}
        form={form}
        formName={mergedConfig?.name || field}
        labelId={mergedConfig.label?.dictCode}
        labelTypeCode={mergedConfig.label?.dictTypeCode}
      />
    </Col>
  ) : null;
};

const TenDaysHospitalizationFlg = (props: any) => {
  const { field, config, isShow, layout, form, editable } = props;
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

TenDaysHospitalizationFlg.displayName = 'tenDaysHospitalizationFlg';
export default TenDaysHospitalizationFlg;
