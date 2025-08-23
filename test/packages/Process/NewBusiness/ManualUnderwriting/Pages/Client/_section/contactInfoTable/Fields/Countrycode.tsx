import React from 'react';
import { Col } from 'antd';
import lodash from 'lodash';

import { getDrowDownList } from '@/utils/dictFormatMessage';
import { Authority, Editable, FormItemSelect, Visible, RuleByForm } from 'basic/components/Form';
import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';
import { fieldConfig } from './Countrycode.config';

export { fieldConfig } from './Countrycode.config';

const FormItem = ({ isShow, layout, form, editable, field, config, handleChange, isLast,id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const dicts = getDrowDownList({ config, fieldProps });
  const dictNames = lodash.uniqBy(
    dicts?.map((item: any) => ({ dictCode: item?.dictName, dictName: item?.dictName })),
    'dictCode'
  );
  // const visibleConditions = RuleByForm(fieldProps['visible-condition'], form, '');
  const visibleConditions = !isLast || RuleByForm(fieldProps['visible-condition'], form, '');
  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  const requiredByRole = useGetRequiredByRole({
    requiredConditions: false,
    config,
    localConfig: fieldConfig,
    clientId: id
  });

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dictNames}
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={
            config?.label?.dictTypeCode || fieldProps.label.dictTypeCode
          }
          required={requiredByRole}
          // labelType="inline"
          hiddenPrefix
          precision={0}
          placeholder=""
          // onFocus={() => {
          //   const value = form.getFieldValue(field);
          //   handleFocus({ value, field });
          // }}
          onChange={handleChange}
        />
      </Col>
    )
  );
};

const Countrycode = ({ form, editable, layout, isShow, id, config, handleChange, isLast }: any) => {
  return (
    <Authority>
      <FormItem
        field={fieldConfig?.field}
        config={config}
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        id={id}
        handleChange={handleChange}
        isLast={isLast}
      />
    </Authority>
  );
};

Countrycode.displayName = 'countryCode';

export default Countrycode;
