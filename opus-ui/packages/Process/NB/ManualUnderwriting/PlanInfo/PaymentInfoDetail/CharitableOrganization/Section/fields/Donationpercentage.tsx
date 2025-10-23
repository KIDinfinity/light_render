import React from 'react';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  Visible,
  RuleByForm,
  Validator,
} from 'basic/components/Form';
import { fieldConfig } from './Donationpercentage.config';
import getFieldRequiredByFormConditions from 'basic/utils/getFieldRequiredByFormConditions';
import useGetCharityOrganizationData from 'process/NB/ManualUnderwriting/_hooks/useGetCharityOrganizationData';
import lodash from 'lodash';

export { fieldConfig } from './Donationpercentage.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = getDrowDownList({ config, fieldProps });

  const visibleConditions = true;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const required = getFieldRequiredByFormConditions({ config, form, disabled: !editable });
  const charityData = useGetCharityOrganizationData();
  const Rules = {
    VLD_000941: Validator.VLD_000941({
      charityData,
      id,
    }),
  };

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
            ((config?.['field-props']?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.['field-props']?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={required}
          hiddenPrefix
          precision={0}
          labelType="inline"
          placeholder={''}
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
        />
      </Col>
    )
  );
};

const Donationpercentage = ({ field, form, editable, layout, isShow, config, id }: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      config={config}
      field={field}
      id={id}
    />
  </Authority>
);

Donationpercentage.displayName = 'donationPercentage';

export default Donationpercentage;
