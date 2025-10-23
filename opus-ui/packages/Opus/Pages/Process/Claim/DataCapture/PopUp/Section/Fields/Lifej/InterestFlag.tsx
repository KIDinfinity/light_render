import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemSelect, Required } from 'basic/components/Form';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { fieldConfig } from './interestFlag.config';

export { fieldConfig } from './interestFlag.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const dicts = getDrowDownList(
    config['x-dict']?.dictTypeCode || fieldConfig?.['field-props']?.['x-dict']?.dictTypeCode
  );

  return (
    isShow && (
      <Col {...layout}>
        <FormItemSelect
          disabled={(config.editable || fieldProps.editable) === Editable.No || !editable}
          dicts={dicts}
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={(config.required || fieldProps.required) === Required.Yes}
        />
      </Col>
    )
  );
};

const InterestFlag = ({ field, config, form, editable, layout, isShow }: any) => (
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

InterestFlag.displayName = 'interestFlag';

export default InterestFlag;
